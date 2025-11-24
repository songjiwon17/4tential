import { useState } from 'react';
import { useAtomValue } from 'jotai';
import { profileSavedAtom } from '../../../store/atoms/ProfileAtoms';
import MyBodyShapePreview from './MyBodyShapePreview';
import MyBodyTitle from './MyBodyTitle';
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

  const months = getMonths(timelineValue);
  const mode = profileData.type || '다이어트';

  const predicted = getBodyPrediction({
    weight: currentData.weight,
    height: currentData.height,
    muscle: currentData.muscle,
    bodyFat: currentData.bodyFat,
    months: months,
    goalType: mode,
  });

  const displayData = {
    weight: timelineValue === 0 ? currentData.weight : predicted.weight,
    muscle: timelineValue === 0 ? currentData.muscle : predicted.muscle,
    bodyFat: timelineValue === 0 ? currentData.bodyFat : predicted.bodyFat,
  };

  // ✅ 체지방률(%) 계산
  const bodyFatPercent = (displayData.bodyFat / displayData.weight) * 100;

  const getTimeLabel = () => {
    if (timelineValue <= 5) return '현재';
    if (timelineValue <= 33) return `${Math.round(months)}개월 후`;
    if (timelineValue <= 66) return `${Math.round(months)}개월 후`;
    return `${Math.round(months)}개월 후`;
  };

  return (
    <>
      <MyBodyTitle>미리보는 나의 변화</MyBodyTitle>

      {/* 슬라이더 */}
      <Box px={4} mb={6} width={'100%'}>
        <Slider
          value={timelineValue}
          onChange={setTimelineValue}
          min={0}
          max={100}
          focusThumbOnChange={false}
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
        {getTimeLabel()}
      </Text>

      {/* 체형 프리뷰 */}
      <Box mb={8}>
        <MyBodyShapePreview
          weight={displayData.weight}
          height={currentData.height}
          muscle={displayData.muscle}
          bodyFat={displayData.bodyFat}
          goalType={mode}
          isCurrentState={timelineValue === 0}
        />
      </Box>

      {/* 수치 표시 */}
      <Flex
        bgGradient={'linear(to-br, #F5F5F5, #E5E5E5)'}
        borderRadius={'12px'}
        p={6}
        justify={'space-around'}
        align={'center'}
        boxShadow={'inset 0 2px 8px rgba(0, 0, 0, 0.1)'}
        width={'100%'}
      >
        <Flex
          direction={'column'}
          align={'center'}
          p={3}
          borderRadius={'8px'}
          transition={'all 0.3s ease'}
          _hover={{
            bg: 'rgba(255, 107, 107, 0.1)',
            transform: 'translateY(-2px)',
          }}
        >
          <Text textStyle="statValue" mb={1}>
            {displayData.weight.toFixed(1)}kg
          </Text>
          <Text textStyle="statLabel">체중</Text>
        </Flex>
        <Flex
          direction={'column'}
          align={'center'}
          p={3}
          borderRadius={'8px'}
          transition={'all 0.3s ease'}
          _hover={{
            bg: 'rgba(255, 107, 107, 0.1)',
            transform: 'translateY(-2px)',
          }}
        >
          <Text textStyle="statValue" mb={1}>
            {displayData.muscle.toFixed(1)}kg
          </Text>
          <Text textStyle="statLabel">근육량</Text>
        </Flex>
        <Flex
          direction={'column'}
          align={'center'}
          p={3}
          borderRadius={'8px'}
          transition={'all 0.3s ease'}
          _hover={{
            bg: 'rgba(255, 107, 107, 0.1)',
            transform: 'translateY(-2px)',
          }}
        >
          <Text textStyle="statValue" mb={1}>
            {/* ✅ 체지방률(%) 표시 */}
            {bodyFatPercent.toFixed(1)}%
          </Text>
          <Text textStyle="statLabel">체지방률</Text>
        </Flex>
      </Flex>
    </>
  );
};

export default MyBodyPredictedChanges;
