import { useState, useEffect } from 'react';
import { useAtomValue } from 'jotai';
import { profileSavedAtom } from '../../../store/atoms/ProfileAtoms';
import MyBodyShapePreview from './MyBodyShapePreview';
import MyBodyTitle from './MyBodyTitle';
import { getBodyPrediction, getFatPercent } from '../utils/MyBodyCalc';
import {
  Box,
  Flex,
  Text,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from '@chakra-ui/react';

const MyBodyPredictedChanges = () => {
  const profileData = useAtomValue(profileSavedAtom);
  const [timelineValue, setTimelineValue] = useState(0);
  const [displayData, setDisplayData] = useState(null); // ✅ displayData를 state로
  const [error, setError] = useState(null);

  const currentData = {
    height: parseFloat(profileData.height) || 170,
    weight: parseFloat(profileData.weight) || 70,
    muscle: parseFloat(profileData.muscle) || 25,
    bodyFat: parseFloat(profileData.bodyFat) || 20,
  };

  const getMonths = (value) => {
    if (value <= 33) return (value * 3) / 33;
    if (value <= 66) return 3 + ((value - 33) * 3) / 33;
    return 6 + ((value - 66) * 6) / 34;
  };

  const mode = profileData.type || '다이어트';

  // ✅ useEffect로 예측 계산
  useEffect(() => {
    if (timelineValue === 0) {
      setDisplayData({
        weight: currentData.weight,
        muscle: currentData.muscle,
        bodyFat: currentData.bodyFat,
      });
      setError(null);
      return;
    }

    try {
      const months = getMonths(timelineValue);
      const predicted = getBodyPrediction({
        weight: currentData.weight,
        height: currentData.height,
        muscle: currentData.muscle,
        bodyFat: currentData.bodyFat,
        months: months,
        goalType: mode,
      });
      setDisplayData(predicted);
      setError(null);
    } catch (err) {
      console.error('체형 예측 에러:', err.message);
      setError(err.message);
      setDisplayData({
        weight: currentData.weight,
        muscle: currentData.muscle,
        bodyFat: currentData.bodyFat,
      });
    }
  }, [
    timelineValue,
    currentData.weight,
    currentData.height,
    currentData.muscle,
    currentData.bodyFat,
    mode,
  ]);

  // ✅ displayData가 없으면 로딩
  if (!displayData) {
    return <Box p={6}>로딩 중...</Box>;
  }

  const bodyFatPercent = getFatPercent(displayData.weight, displayData.bodyFat);
  const months = getMonths(timelineValue);

  const getTimeLabel = () => {
    if (timelineValue <= 5) return '현재';
    if (timelineValue <= 33) return `${Math.round(months)}개월 후`;
    if (timelineValue <= 66) return `${Math.round(months)}개월 후`;
    return `${Math.round(months)}개월 후`;
  };

  const isValidInput =
    currentData.muscle + currentData.bodyFat <= currentData.weight * 0.95;

  return (
    <>
      {/* 입력값 오류 경고 */}
      {!isValidInput && (
        <Box p={4} bg="red.500" borderRadius="md" color="white" mb={4}>
          ⚠️ 입력된 체성분 정보가 올바르지 않습니다. 프로필을 다시 확인해주세요.
        </Box>
      )}

      {/* 예측 에러 경고 */}
      {error && timelineValue > 0 && (
        <Box p={4} bg="orange.500" borderRadius="md" color="white" mb={4}>
          ⚠️ 체형 예측을 계산할 수 없습니다: {error}
        </Box>
      )}

      <MyBodyTitle>미리보는 나의 변화</MyBodyTitle>

      {/* 슬라이더 */}
      <Box px={4} mb={6} width={'100%'}>
        <Slider
          value={timelineValue}
          onChange={setTimelineValue}
          min={0}
          max={100}
          focusThumbOnChange={false}
          isDisabled={!isValidInput}
        >
          <SliderTrack bg={'rgba(255, 255, 255, 0.1)'} h={'4px'}>
            <SliderFilledTrack bgGradient={'linear(to-r, #FF6B6B, #FF8E8E)'} />
          </SliderTrack>
          <SliderThumb
            boxSize={6}
            bg={'#FFF'}
            boxShadow={'0 4px 16px rgba(255, 107, 107, 0.5)'}
            _hover={{ transform: 'scale(1.2)' }}
            transition={'all 0.2s ease'}
          />
        </Slider>

        <Flex justify={'space-between'} mt={3}>
          {['현재', '3개월 후', '6개월 후', '1년 후'].map((label, idx) => (
            <Text
              key={label}
              color={
                (idx === 0 && timelineValue <= 5) ||
                (idx === 1 && timelineValue > 5 && timelineValue <= 33) ||
                (idx === 2 && timelineValue > 33 && timelineValue <= 66) ||
                (idx === 3 && timelineValue > 66)
                  ? '#FF6B6B'
                  : '#888'
              }
              fontSize={'xs'}
              fontWeight={'medium'}
              transition={'color 0.2s ease'}
            >
              {label}
            </Text>
          ))}
        </Flex>
      </Box>

      {/* 현재 시점 표시 */}
      <Text textStyle="timelineLabel" mb={4}>
        {error ? '현재' : getTimeLabel()}
      </Text>

      {/* 체형 프리뷰 */}
      <Box mb={8}>
        <MyBodyShapePreview
          weight={displayData.weight}
          height={currentData.height}
          muscle={displayData.muscle}
          bodyFat={displayData.bodyFat}
          goalType={mode}
          isCurrentState={timelineValue === 0 || error !== null}
        />
      </Box>
    </>
  );
};

export default MyBodyPredictedChanges;
