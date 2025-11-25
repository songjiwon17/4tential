import Line from '../../components/Line';
import { Text, Box, Flex } from '@chakra-ui/react';
import FoodInputBox from './component/FoodInputBox';
import FoodRecomendationBtn from './component/FoodRecomendationBtn';
import useFood from './hooks/useFood';
import { useFoodMessage } from '../../store/query/QueryPath';

const FoodContentsBox = () => {
  const { selectedFood, handleClickRecommend, handleClickSearch } = useFood();
  const { data: nutrition, isLoading, error } = useFoodMessage(selectedFood);
  return (
    <>
      <Flex direction="column" w="100%">
        <FoodInputBox onSearch={handleClickSearch} />
        <Box mt="45px">
          <Line />
        </Box>
        <Text mt={5} fontWeight={'bold'} textAlign={'left'} w="100%">
          추천 검색어
        </Text>
        <Flex mt={30} gap={3} justifyContent="flex-start">
          <FoodRecomendationBtn
            value={'카페라떼'}
            onClick={handleClickRecommend}
            isSelected={selectedFood === '카페라떼'}
          />
          <FoodRecomendationBtn
            value={'햄버거'}
            onClick={handleClickRecommend}
            isSelected={selectedFood === '햄버거'}
          />
          <FoodRecomendationBtn
            value={'고구마피자'}
            onClick={handleClickRecommend}
            isSelected={selectedFood === '고구마피자'}
          />
          <FoodRecomendationBtn
            value={'돈가스'}
            onClick={handleClickRecommend}
            isSelected={selectedFood === '돈가스'}
          />
        </Flex>
      </Flex>
      <Flex mt={2} gap={3} justifyContent="flex-start">
        <FoodRecomendationBtn
          value={'냉면'}
          onClick={handleClickRecommend}
          isSelected={selectedFood === '냉면'}
        />
        <FoodRecomendationBtn
          value={'알리오올리오'}
          onClick={handleClickRecommend}
          isSelected={selectedFood === '알리오올리오'}
        />
        <FoodRecomendationBtn
          value={'팟타이'}
          onClick={handleClickRecommend}
          isSelected={selectedFood === '팟타이'}
        />
        <FoodRecomendationBtn
          value={'돈코츠라멘'}
          onClick={handleClickRecommend}
          isSelected={selectedFood === '돈코츠라멘'}
        />
      </Flex>
      <Text mt={10} fontWeight={'bold'} textAlign={'left'} w="100%">
        🍱 검색한
        <Text as="span">&nbsp;{selectedFood}&nbsp;</Text>
        영양 정보
      </Text>

      {selectedFood && isLoading && <Text>로딩중...</Text>}
      {error && <Text>에러 발생: {error.message}</Text>}
      {!isLoading && !nutrition && selectedFood && (
        <Box
          mt="20px"
          p="40px"
          textAlign="center"
          border="1px dashed #C7C7C7"
          borderRadius="10px"
          mb="50px"
        >
          <Text fontSize="lg" fontWeight="bold">
            검색 결과가 없습니다.
          </Text>
          <Text fontSize="sm" mt={2}>
            정확한 음식명으로 다시 검색해 보세요.
          </Text>
        </Box>
      )}
      {nutrition && (
        <Box
          mt="20px"
          width="100%"
          height="auto"
          minH="200px"
          borderRadius="10px"
          backgroundColor="#C7C7C7"
          margin={{ base: '20px 0 40px 0', md: '40px 0 60px 0' }}
          p={{ base: '20px', md: '40px' }}
          mb="50px"
        >
          <Flex
            justifyContent="center"
            gap={{ base: '20px', md: '60px', lg: '140px' }}
            mb="10px"
            flexWrap="wrap"
          >
            <Box textAlign="center">
              <Text variant="foodInfoText">
                {Number(nutrition.kcal).toFixed(0)} kcal
              </Text>
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
              <Text variant="foodInfoText">{nutrition.carbs} g</Text>
              <Text color="gray.500" fontSize="sm">
                탄수화물
              </Text>
            </Box>
          </Flex>
        </Box>
      )}
    </>
  );
};
export default FoodContentsBox;
