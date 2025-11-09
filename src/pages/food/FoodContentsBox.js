import Line from '../../components/Line';
import { Text, Box, Flex } from '@chakra-ui/react';
import FoodInputBox from './component/FoodInputBox';
import FoodRecomendationBtn from './component/FoodRecomendationBtn';
import { useState } from 'react';
const foodData = {
  플랫화이트: {
    calories: '120 kcal',
    protein: '6g',
    fat: '7g',
    carb: '10g',
    description:
      '통(Whole)우유 사용 + 큰 사이즈 → 약 170 kcal 수준\n스킴(저지방)우유 사용 시 칼로리 훨씬 낮게 나옴',
  },
  햄버거: {
    calories: '250 kcal',
    protein: '12g',
    fat: '10g',
    carb: '30g',
    description:
      '표준 햄버거 1개 기준\n단백질, 탄수화물, 지방이 균형 있게 포함됨',
  },
  양배추: {
    calories: '25 kcal',
    protein: '1g',
    fat: '0g',
    carb: '6g',
    description: '생 양배추 100g 기준\n식이섬유와 비타민 C 풍부',
  },
  돈가스: {
    calories: '350 kcal',
    protein: '20g',
    fat: '18g',
    carb: '30g',
    description: '돈가스 1인분 기준\n튀김으로 지방이 많아 칼로리 주의',
  },
  냉면: {
    calories: '300 kcal',
    protein: '8g',
    fat: '5g',
    carb: '60g',
    description: '냉면 1인분 기준\n탄수화물이 많아 포만감 있음',
  },
  단호박: {
    calories: '90 kcal',
    protein: '2g',
    fat: '0g',
    carb: '20g',
    description: '찐 단호박 100g 기준\n베타카로틴과 식이섬유 풍부',
  },
  팟타이: {
    calories: '400 kcal',
    protein: '15g',
    fat: '18g',
    carb: '45g',
    description: '팟타이 1인분 기준\n탄수화물과 지방이 많음',
  },
  라멘: {
    calories: '500 kcal',
    protein: '20g',
    fat: '22g',
    carb: '60g',
    description: '라멘 1인분 기준\n국물과 면에 탄수화물과 나트륨 다량 포함',
  },
};

const FoodContentsBox = () => {
  const [selectedFood, setSelectedFood] = useState('');
  const [nutrition, setNutrition] = useState(null);

  const handleRecommend = (foodName) => {
    const data = foodData[foodName];
    if (data) {
      setSelectedFood(foodName);
      setNutrition(data);
    } else {
      setSelectedFood('');
      setNutrition(null);
    }
  };
  const handleSearch = (inputValue) => {
    const searchTerm = inputValue.replace(/\s/g, '');
    handleRecommend(searchTerm);
  };

  return (
    <>
      <FoodInputBox onSearch={handleSearch} />
      <Box mt="45px">
        <Line />
      </Box>
      <Text mt={5} fontWeight={'bold'} textAlign={'left'} w="100%">
        추천 검색어
      </Text>
      <Flex mt={30} gap={3} alignSelf="center">
        <FoodRecomendationBtn value={'플랫화이트'} onClick={handleRecommend} />
        <FoodRecomendationBtn value={'햄버거'} onClick={handleRecommend} />
        <FoodRecomendationBtn value={'양배추'} onClick={handleRecommend} />
        <FoodRecomendationBtn value={'돈가스'} onClick={handleRecommend} />
      </Flex>
      <Flex mt={2} gap={3} alignSelf="center">
        <FoodRecomendationBtn value={'냉면'} onClick={handleRecommend} />
        <FoodRecomendationBtn value={'단호박'} onClick={handleRecommend} />
        <FoodRecomendationBtn value={'팟타이'} onClick={handleRecommend} />
        <FoodRecomendationBtn value={'라멘'} onClick={handleRecommend} />
      </Flex>
      <Text mt={10} fontWeight={'bold'} textAlign={'left'} w="100%">
        🍱 검색한
        <Text as="span">&nbsp;&nbsp;{selectedFood}&nbsp;&nbsp;</Text>
        영양 정보
      </Text>
      {nutrition && (
        <Box
          mt="20px"
          width="954px"
          height="200px"
          borderRadius="10px"
          backgroundColor="#C7C7C7"
          margin="40px 0 60px 0"
          p="40px"
        >
          <Flex justifyContent="center" gap="140px" mb="10px">
            <Box textAlign="center">
              <Text variant="foodInfoText">{nutrition.calories}</Text>
              <Text color="gray.500" fontSize="sm">
                칼로리
              </Text>
            </Box>
            <Box textAlign="center">
              <Text variant="foodInfoText">{nutrition.protein}</Text>
              <Text color="gray.500" fontSize="sm">
                단백질
              </Text>
            </Box>
            <Box textAlign="center">
              <Text variant="foodInfoText">{nutrition.fat}</Text>
              <Text color="gray.500" fontSize="sm">
                지방
              </Text>
            </Box>
            <Box textAlign="center">
              <Text variant="foodInfoText">{nutrition.carb}</Text>
              <Text color="gray.500" fontSize="sm">
                탄수화물
              </Text>
            </Box>
          </Flex>
          <Text mt={8} fontSize="sm" color="#000000" textAlign="center">
            {nutrition.description.split('\n').map((line, idx) => (
              <span key={idx}>
                {line}
                <br />
              </span>
            ))}
          </Text>
        </Box>
      )}
    </>
  );
};
export default FoodContentsBox;
