import { Box, Image, Text, Flex, Badge } from '@chakra-ui/react';
import { getBmi, getBmiClass } from '../utils/MyBodyCalc';

// BMI 이미지 (다이어트용)
import bmi1 from '../../../assets/images/bmi1.png'; // 저체중
import bmi2 from '../../../assets/images/bmi2.png'; // 정상 하한
import bmi3 from '../../../assets/images/bmi3.png'; // 정상
import bmi4 from '../../../assets/images/bmi4.png'; // 과체중
import bmi5 from '../../../assets/images/bmi5.png'; // 비만
import bmi6 from '../../../assets/images/bmi6.png'; // 고도비만

// 근육 이미지 (근력향상용) - 5단계
import muscle0_1 from '../../../assets/images/muscle0-1.png'; // 1단계: 일반 체형 (시작)
import muscle2 from '../../../assets/images/muscle2.png'; // 2단계: 약간의 근육
import muscle1_1 from '../../../assets/images/muscle1-1.png'; // 3단계: 탄탄한 체형
import muscle1_2 from '../../../assets/images/muscle1-2.png'; // 4단계: 복근 보이는
import muscle0 from '../../../assets/images/muscle0.png'; // 5단계: 근육질 (최종)

const MyBodyShapePreview = ({
  weight = 70,
  height = 170,
  muscle = 25,
  bodyFat = 20,
  goalType = '다이어트',
  isCurrentState = false,
}) => {
  const bmi = getBmi(weight, height);
  const bmiClass = getBmiClass(bmi);
  const fatPercent = (bodyFat / weight) * 100;
  const muscleRatio = (muscle / weight) * 100;

  // ✅ BMI 기반 이미지 선택 (다이어트용)
  const getBmiImage = () => {
    if (bmi < 18.5) return bmi1; // 저체중
    if (bmi < 21) return bmi2; // 정상 하한
    if (bmi < 23) return bmi3; // 정상
    if (bmi < 25) return bmi4; // 과체중
    if (bmi < 30) return bmi5; // 비만
    return bmi6; // 고도비만
  };

  // ✅ 수정: 근력향상 - BMI 30 이상도 개선 시 muscle 이미지 사용 가능
  const getMuscleImage = () => {
    // 저체중은 BMI 이미지
    if (bmi < 18.5) {
      return getBmiImage();
    }

    // ✅ 수정: 초고도비만 (BMI 35+)만 BMI 이미지로 제한
    if (bmi >= 35) {
      return getBmiImage();
    }

    // ✅ 수정: 체지방률 38% 초과 시에만 BMI 이미지 (기존 30% → 38%)
    if (fatPercent > 38) {
      return getBmiImage();
    }

    // ✅ 수정: 고도비만 (BMI 30~35) 전용 로직
    if (bmi >= 30 && bmi < 35) {
      // 개선 지표: 근육비율 37%+ 또는 체지방률 32% 이하
      if (muscleRatio >= 37 || fatPercent <= 32) {
        // 3단계: 근육비율 40%+, 체지방률 28% 이하
        if (muscleRatio >= 40 && fatPercent <= 28) {
          return muscle1_1;
        }
        // 2단계: 근육비율 37%+, 체지방률 32% 이하
        if (muscleRatio >= 37 && fatPercent <= 32) {
          return muscle2;
        }
        // 1단계: 개선 시작
        return muscle0_1;
      }
      // 아직 개선이 미미하면 BMI 이미지
      return getBmiImage();
    }

    // ✅ 비만 (BMI 25~30): 체지방률 조건 완화
    if (bmi >= 25 && bmi < 30) {
      // 체지방률 35% 초과 시 BMI 이미지 (기존 30% → 35%)
      if (fatPercent > 35) {
        return getBmiImage();
      }
    }

    // ✅ 정상~과체중 구간 (BMI 18.5~30): 5단계 muscle 이미지
    // 5단계 (최종): 근육비율 43%+, 체지방률 22% 이하
    if (muscleRatio >= 43 && fatPercent <= 22) {
      return muscle0;
    }
    // 4단계: 근육비율 41%+, 체지방률 24% 이하
    if (muscleRatio >= 41 && fatPercent <= 24) {
      return muscle1_2;
    }
    // 3단계: 근육비율 39%+, 체지방률 26% 이하
    if (muscleRatio >= 39 && fatPercent <= 26) {
      return muscle1_1;
    }
    // 2단계: 근육비율 37%+, 체지방률 28% 이하
    if (muscleRatio >= 37 && fatPercent <= 28) {
      return muscle2;
    }
    // 1단계 (시작): 그 외
    return muscle0_1;
  };

  // ✅ 체력향상/체형교정: 상황에 따라
  const getCardioImage = () => {
    // 정상~비만 BMI에서 운동 효과가 있으면 muscle
    if (bmi >= 18.5 && bmi < 32) {
      // 체지방률이 낮거나 근육비율이 높으면 muscle
      if (fatPercent <= 28 || muscleRatio >= 37) {
        return getMuscleImage();
      }
    }
    // 그 외에는 BMI 이미지
    return getBmiImage();
  };

  // ✅ 최종 이미지 선택
  const getBodyImage = () => {
    // 현재 상태는 무조건 BMI
    if (isCurrentState) {
      return getBmiImage();
    }

    // 목표별 이미지 선택
    switch (goalType) {
      case '다이어트':
        return getBmiImage();
      case '근력향상':
        return getMuscleImage();
      case '체력향상':
        return getCardioImage();
      case '체형교정':
        return getCardioImage();
      default:
        return getBmiImage();
    }
  };

  // ✅ 라벨 생성 (5단계로 세분화)
  const getBodyLabel = () => {
    if (isCurrentState) {
      return bmiClass;
    }

    const image = getBodyImage();

    // muscle 이미지 라벨
    if (image === muscle0) {
      return goalType === '근력향상' ? '근육질 체형' : '탄탄한 체형';
    }
    if (image === muscle1_2) {
      return goalType === '근력향상' ? '탄탄한 근육형' : '건강한 체형';
    }
    if (image === muscle1_1) {
      return goalType === '근력향상' ? '운동 적응형' : '균형잡힌 체형';
    }
    if (image === muscle2) {
      return goalType === '근력향상' ? '초기 발달형' : '활동적 체형';
    }
    if (image === muscle0_1) {
      return goalType === '근력향상' ? '운동 시작형' : '일반 체형';
    }

    // BMI 이미지는 BMI 등급 그대로
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

  // 체지방률 색상
  const getFatPercentColor = () => {
    if (fatPercent <= 14) return '#4ADE80'; // 초록
    if (fatPercent <= 19) return '#60A5FA'; // 파랑
    if (fatPercent <= 25) return '#FFC107'; // 노랑
    return '#FF6B6B'; // 빨강
  };

  // 근육비율 색상
  const getMuscleRatioColor = () => {
    if (muscleRatio >= 43) return '#4ADE80'; // 초록
    if (muscleRatio >= 40) return '#60A5FA'; // 파랑
    if (muscleRatio >= 37) return '#FFC107'; // 노랑
    return '#888'; // 회색
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
      {/* 상단 정보 */}
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

      {/* 수치 정보 - 근육비율 추가 */}
      <Flex
        justify="space-around"
        mb={4}
        p={3}
        bg="rgba(255,255,255,0.03)"
        borderRadius="8px"
        flexWrap="wrap"
        gap={2}
      >
        <Flex direction="column" align="center" minW="60px">
          <Text color="#FFF" fontSize="lg" fontWeight="bold">
            {typeof weight === 'number' ? weight.toFixed(1) : weight}kg
          </Text>
          <Text color="#666" fontSize="xs">
            체중
          </Text>
        </Flex>

        <Box w="1px" bg="rgba(255,255,255,0.1)" />

        <Flex direction="column" align="center" minW="60px">
          <Text color="#4ADE80" fontSize="lg" fontWeight="bold">
            {typeof muscle === 'number' ? muscle.toFixed(1) : muscle}kg
          </Text>
          <Text color="#666" fontSize="xs">
            근육량
          </Text>
        </Flex>

        <Box w="1px" bg="rgba(255,255,255,0.1)" />

        <Flex direction="column" align="center" minW="60px">
          <Text color={getMuscleRatioColor()} fontSize="lg" fontWeight="bold">
            {muscleRatio.toFixed(1)}%
          </Text>
          <Text color="#666" fontSize="xs">
            근육비율
          </Text>
        </Flex>

        <Box w="1px" bg="rgba(255,255,255,0.1)" />

        <Flex direction="column" align="center" minW="60px">
          <Text color="#FF6B6B" fontSize="lg" fontWeight="bold">
            {typeof bodyFat === 'number' ? bodyFat.toFixed(1) : bodyFat}kg
          </Text>
          <Text color="#666" fontSize="xs">
            체지방량
          </Text>
        </Flex>

        <Box w="1px" bg="rgba(255,255,255,0.1)" />

        <Flex direction="column" align="center" minW="60px">
          <Text color={getFatPercentColor()} fontSize="lg" fontWeight="bold">
            {fatPercent.toFixed(1)}%
          </Text>
          <Text color="#666" fontSize="xs">
            체지방률
          </Text>
        </Flex>
      </Flex>

      {/* 체형 이미지 */}
      <Flex justify="center" align="center" h="500px">
        <Image
          src={imageSrc}
          alt="체형"
          h="480px"
          w="auto"
          maxW="350px"
          objectFit="contain"
          transition="all 0.4s ease-in-out"
          filter="drop-shadow(0 4px 12px rgba(0,0,0,0.3))"
        />
      </Flex>
    </Box>
  );
};

export default MyBodyShapePreview;
