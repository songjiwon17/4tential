import Line from '../../components/Line';
import { Text, Box, Flex } from '@chakra-ui/react';
import FoodInputBox from './component/FoodInputBox';
import FoodRecomendationBtn from './component/FoodRecomendationBtn';
import useFood from './hooks/useFood';

const FoodContentsBox = () => {
  const { selectedFood, nutrition, handleRecommend, handleSearch } = useFood();
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
              <Text variant="foodInfoText">{nutrition.calories} kcal</Text>
              <Text color="gray.500" fontSize="sm">
                칼로리
              </Text>
            </Box>
            <Box textAlign="center">
              <Text variant="foodInfoText">{nutrition.protein} g</Text>
              <Text color="gray.500" fontSize="sm">
                단백질
              </Text>
            </Box>
            <Box textAlign="center">
              <Text variant="foodInfoText">{nutrition.fat} g</Text>
              <Text color="gray.500" fontSize="sm">
                지방
              </Text>
            </Box>
            <Box textAlign="center">
              <Text variant="foodInfoText">{nutrition.carb} g</Text>
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
