import { Box, Image, Text, Flex, Badge } from '@chakra-ui/react';
import { getBmi, getBmiClass } from '../utils/MyBodyCalc';

// 이미지 import
import bmi1 from '../../../assets/images/bmi1.png';
import bmi2 from '../../../assets/images/bmi2.png';
import bmi3 from '../../../assets/images/bmi3.png';
import bmi4 from '../../../assets/images/bmi4.png';
import bmi5 from '../../../assets/images/bmi5.png';
import bmi6 from '../../../assets/images/bmi6.png';
import muscle1 from '../../../assets/images/muscle1.png';
import muscle3 from '../../../assets/images/muscle3.png';
import muscle4 from '../../../assets/images/muscle4.png';

const MyBodyShapePreview = ({
  weight = 70,
  height = 170,
  muscle = 25,
  bodyFat = 20,
  goalType = '다이어트',
  isCurrentState = false, // 현재 상태인지 여부 추가
}) => {
  const bmi = getBmi(weight, height);
  const bmiClass = getBmiClass(bmi);
  const fatPercent = (bodyFat / weight) * 100;
  const muscleRatio = (muscle / weight) * 100;

  // BMI 기반 이미지 선택
  const getBmiImage = () => {
    if (bmi < 18.5) return bmi1;
    if (bmi < 21) return bmi2;
    if (bmi < 23) return bmi3;
    if (bmi < 25) return bmi4;
    if (bmi < 30) return bmi5;
    return bmi6;
  };

  // 이미지 선택 로직
  const getBodyImage = () => {
    // ✅ 현재 상태는 항상 BMI 기반 (목표 상관없이)
    if (isCurrentState) {
      return getBmiImage();
    }

    // ✅ 예측 상태 - 근력향상 모드
    if (goalType === '근력향상') {
      // 아직 과체중/비만이면 BMI 기반
      if (bmi >= 23) {
        return getBmiImage();
      }
      // 정상체중 범위 도달 후 → 근육 이미지
      if (bmi >= 18.5 && bmi < 23) {
        // 근육비율에 따라 단계 구분
        if (muscleRatio >= 45) return muscle4; // 최상위 근육질
        if (muscleRatio >= 38) return muscle3; // 상위 근육질
        return muscle1; // 중간 근육질
      }
      // 저체중이면 BMI 기반
      return getBmiImage();
    }

    // 다이어트, 체력향상, 체형교정 → BMI 기반
    return getBmiImage();
  };

  // 체형 라벨
  const getBodyLabel = () => {
    // 현재 상태는 항상 BMI 등급
    if (isCurrentState) {
      return bmiClass;
    }

    // 예측 상태 - 근력향상
    if (goalType === '근력향상') {
      if (bmi >= 23) return bmiClass; // 아직 과체중 이상
      if (bmi >= 18.5 && bmi < 23) {
        if (muscleRatio >= 45) return '최상위 근육질';
        if (muscleRatio >= 38) return '상위 근육질';
        return '근육질';
      }
      return bmiClass;
    }

    return bmiClass;
  };

  // 목표 라벨 색상
  const getGoalColor = () => {
    switch (goalType) {
      case '다이어트':
        return 'red';
      case '근력향상':
        return 'blue';
      case '체력향상':
        return 'green';
      case '체형교정':
        return 'purple';
      default:
        return 'gray';
    }
  };

  const imageSrc = getBodyImage();
  const label = getBodyLabel();

  return (
    <Box
      w="100%"
      bg="linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)"
      borderRadius="12px"
      overflow="hidden"
      p={6}
    >
      {/* 상단 정보 영역 */}
      <Flex
        justify="space-between"
        align="center"
        mb={4}
        p={4}
        bg="rgba(255,255,255,0.05)"
        borderRadius="10px"
      >
        <Flex direction="column" gap={1}>
          <Text color="#FF6B6B" fontSize="2xl" fontWeight="bold">
            {label}
          </Text>
          <Text color="#888" fontSize="sm">
            BMI {bmi.toFixed(1)}
          </Text>
        </Flex>

        <Badge
          colorScheme={getGoalColor()}
          fontSize="sm"
          px={3}
          py={1}
          borderRadius="full"
        >
          {goalType}
        </Badge>
      </Flex>

      {/* 수치 정보 바 */}
      <Flex
        justify="space-around"
        mb={4}
        p={3}
        bg="rgba(255,255,255,0.03)"
        borderRadius="8px"
      >
        <Flex direction="column" align="center">
          <Text color="#FFF" fontSize="lg" fontWeight="bold">
            {typeof weight === 'number' ? weight.toFixed(1) : weight}kg
          </Text>
          <Text color="#666" fontSize="xs">
            체중
          </Text>
        </Flex>
        <Box w="1px" bg="rgba(255,255,255,0.1)" />
        <Flex direction="column" align="center">
          <Text color="#FFF" fontSize="lg" fontWeight="bold">
            {typeof muscle === 'number' ? muscle.toFixed(1) : muscle}kg
          </Text>
          <Text color="#666" fontSize="xs">
            근육량
          </Text>
        </Flex>
        <Box w="1px" bg="rgba(255,255,255,0.1)" />
        <Flex direction="column" align="center">
          <Text color="#FFF" fontSize="lg" fontWeight="bold">
            {fatPercent.toFixed(1)}%
          </Text>
          <Text color="#666" fontSize="xs">
            체지방률
          </Text>
        </Flex>
      </Flex>

      {/* 체형 이미지 - 고정 크기 */}
      <Flex justify="center" align="center" h="500px">
        <Image
          src={imageSrc}
          alt="체형"
          h="480px"
          w="auto"
          maxW="350px"
          objectFit="contain"
          transition="opacity 0.3s ease"
          filter="drop-shadow(0 4px 12px rgba(0,0,0,0.3))"
        />
      </Flex>
    </Box>
  );
};

export default MyBodyShapePreview;
