import { Box, Text } from '@chakra-ui/react';

// 영양 정보를 분석해서 메시지와 스타일을 결정하는 함수.
const getAnalysisResult = (nutrition) => {
  const SERVING_MULTIPLIER = 2; // 성인 1인분 평균인 '200g'을 기준으로 가정하여 값을 2배로 불려서 판단.

  const { kcal, protein, fat, carbs } = nutrition;

  const numKcal = Number(kcal) * SERVING_MULTIPLIER; // 판단용 칼로리.
  const numProtein = Number(protein) * SERVING_MULTIPLIER; // 판단용 단백질.
  const numFat = Number(fat) * SERVING_MULTIPLIER; // 판단용 지방.
  const numCarbs = Number(carbs) * SERVING_MULTIPLIER; // 판단용 탄수화물.

  // 기준값 설정
  const IS_HEAVY = numKcal >= 700 || numFat >= 30; // 고칼로리 or 고지방 판별 기준.
  const IS_HIGH_PROTEIN = numProtein >= 20; // 고단백 판별 기준.

  // 헤비 + 고단백 (보라색) 판별.
  if (IS_HEAVY && IS_HIGH_PROTEIN) {
    return {
      message: '💪 단백질은 훌륭하지만 칼로리가 높아요! 양 조절이 필요해요.',
      color: 'purple.600',
      bgColor: 'purple.50',
      borderColor: 'purple.200',
    };
  }

  // 헤비 (빨간색) 판별.
  if (IS_HEAVY) {
    return {
      message:
        '🚨 운동 전후로 드시기엔 너무 헤비해요! 소화가 오래 걸릴 수 있습니다.',
      color: 'red.600',
      bgColor: 'red.50',
      borderColor: 'red.200',
    };
  }

  // 고단백 (파란색) 판별.
  if (IS_HIGH_PROTEIN) {
    return {
      message: '💪 근성장에 딱이에요! 운동 후 섭취를 추천드려요.',
      color: 'blue.600',
      bgColor: 'blue.50',
      borderColor: 'blue.200',
    };
  }

  // 고탄수 (주황색) 판별.
  if (numCarbs >= 80) {
    return {
      message: '⚡️에너지가 넘치는 식단! 고강도 운동 전에 추천해요.',
      color: 'orange.600',
      bgColor: 'orange.50',
      borderColor: 'orange.200',
    };
  }

  // 무난 (회색) 판별.
  return {
    message: '👌 밸런스가 좋은 무난한 식단입니다.',
    color: 'gray.600',
    bgColor: 'gray.100',
    borderColor: 'gray.300',
  };
};

/**
 * [FoodFeedback] 컴포넌트
 * 역할: 영양 정보를 받아서 분석 결과를 박스로 보여줌
 *
 */
const FoodFeedback = ({ nutrition }) => {
  if (!nutrition) return null; // 데이터 없으면 null 반환.

  // 위에서 만든 함수로 결과 받아오기.
  const result = getAnalysisResult(nutrition);

  return (
    <Box
      w="100%"
      p="15px"
      mb="20px"
      borderRadius="10px"
      textAlign="center"
      bg={result.bgColor}
      border="1px solid"
      borderColor={result.borderColor}
    >
      <Text
        color={result.color}
        fontWeight="bold"
        fontSize={{ base: 'md', md: 'xl' }}
      >
        {result.message}
      </Text>
    </Box>
  );
};

export default FoodFeedback;
