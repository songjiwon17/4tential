import { useState, useEffect } from 'react';
import { useAtomValue } from 'jotai';
import { profileSavedAtom } from '../../../store/atoms/ProfileAtoms';
import MyBodyShapePreview from './MyBodyShapePreview';
import { getBodyPrediction } from '../utils/MyBodyCalc';
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
  const [displayData, setDisplayData] = useState(null);
  const [error, setError] = useState(null);

  // ✅ 개별 값으로 추출
  const height = parseFloat(profileData.height) || 158;
  const weight = parseFloat(profileData.weight) || 60;
  const muscle = parseFloat(profileData.muscle) || 21;
  const bodyFatPercent = parseFloat(profileData.bodyFat) || 25; // 체지방률(%)
  const bodyFat = weight * (bodyFatPercent / 100); // ✅ 체지방량(kg)으로 변환
  const mode = profileData.type || '다이어트';

  const getMonths = (value) => {
    if (value <= 33) return (value * 3) / 33;
    if (value <= 66) return 3 + ((value - 33) * 3) / 33;
    return 6 + ((value - 66) * 6) / 34;
  };

  // ✅ useEffect 수정
  useEffect(() => {
    if (timelineValue === 0) {
      setDisplayData({
        weight: weight,
        muscle: muscle,
        bodyFat: bodyFat,
      });
      setError(null);
      return;
    }

    try {
      const months = getMonths(timelineValue);
      const predicted = getBodyPrediction({
        weight: weight,
        height: height,
        muscle: muscle,
        bodyFat: bodyFat,
        months: months,
        goalType: mode,
      });

      console.log(`${months}개월 예측:`, predicted);

      setDisplayData(predicted);
      setError(null);
    } catch (err) {
      console.error('체형 예측 에러:', err.message);
      setError(err.message);
      setDisplayData({
        weight: weight,
        muscle: muscle,
        bodyFat: bodyFat,
      });
    }
  }, [timelineValue, weight, height, muscle, bodyFat, mode]);

  if (!displayData) {
    return <Box p={6}>로딩 중...</Box>;
  }

  //const bodyFatPercent = getFatPercent(displayData.weight, displayData.bodyFat);
  const months = getMonths(timelineValue);

  const getTimeLabel = () => {
    if (timelineValue <= 5) return '현재';
    if (timelineValue <= 33) return `${Math.round(months)}개월 후`;
    if (timelineValue <= 66) return `${Math.round(months)}개월 후`;
    return `${Math.round(months)}개월 후`;
  };

  const isValidInput = muscle + bodyFat <= weight * 0.95;

  return (
    <>
      {!isValidInput && (
        <Box p={4} bg="red.500" borderRadius="md" color="white" mb={4}>
          ⚠️ 입력된 체성분 정보가 올바르지 않습니다. 프로필을 다시 확인해주세요.
        </Box>
      )}

      {error && timelineValue > 0 && (
        <Box p={4} bg="orange.500" borderRadius="md" color="white" mb={4}>
          ⚠️ 체형 예측을 계산할 수 없습니다: {error}
        </Box>
      )}

      {/* ✅ MyBodyTitle 대신 Text 직접 사용 */}
      <Text textStyle="sectionTitle" mb={8}>
        미리보는 나의 변화
      </Text>

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

      <Text textStyle="timelineLabel" mb={4}>
        {error ? '현재' : getTimeLabel()}
      </Text>

      <Box mb={8}>
        <MyBodyShapePreview
          weight={displayData.weight}
          height={height}
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
