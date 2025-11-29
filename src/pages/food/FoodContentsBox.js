import Line from '../../components/Line';
import { Text, Box, Flex } from '@chakra-ui/react';
import FoodInputBox from './component/FoodInputBox';
import FoodRecomendationBtn from './component/FoodRecomendationBtn';
import FoodFeedback from './component/FoodFeedback';
import useFood from './hooks/useFood';
import { useFoodMessage } from '../../store/query/QueryPath';

/**
 * ============================================
 * 식단 검색 페이지 - 메인 콘텐츠 박스
 * ============================================
 *
 * 역할:
 * 1. UI 프레젠테이션: 검색창, 추천 검색어 목록, 영양 정보 카드 렌더링
 * 2. 상태 연결: useFood 훅을 통한 UI 인터랙션 처리
 * 3. 데이터 패칭: useFoodMessage 훅을 통한 서버 통신 및 로딩/에러 상태 처리
 *
 * 데이터 흐름:
 * 1. Input 입력 또는 추천 버튼 클릭 ->  handleClickRecommend/handleClickSearch 호출
 * 2. selectedFood 상태 변경 (setSelectedFood)
 * 3. selectedFood 변경 감지 -> useFoodMessage 쿼리 트리거
 * 4. API 응답(nutrition) 수신 -> 결과 렌더링
 *
 * 주요 로직:
 * 1. 검색어 상태 관리: 사용자의 입력이나 클릭으로 selectedFood 상태를 변경
 * 2. 데이터 자동 동기화: selectedFood 값이 바뀔 때마다 useFoodMessage가 자동으로 서버에 데이터를 요청
 * 3. 화면 처리: 로딩, 에러, 데이터 없음 등 서버 응답 상태에 따라 UI를 다르게 보여줌
 *
 */

const FoodContentsBox = () => {
  const { selectedFood, handleClickRecommend, handleClickSearch } = useFood();
  const { data: nutrition, isLoading, error } = useFoodMessage(selectedFood); // selectFood값이 변경되면 렌더링 시 useFoodMessage()에 값이 전달됨.
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
        {/* selectFood가 변경되면 렌더링을 통해 해당 값을 화면에 표시 */}
        <Text as="span">&nbsp;{selectedFood}&nbsp;</Text>
        영양 정보
      </Text>
      {/* selectedFood 값이 변경 되었을 때 isLoading 값은 데이터가 올 때까지 True, 데이터가 도착하면 false */}
      {selectedFood && isLoading && <Text>로딩중...</Text>}
      {/* API 요청이 실패했을 때 전달받은 error 메세지 출력 */}
      {error && <Text>에러 발생: {error.message}</Text>}
      {/* API 요청이 성공은 성공했지만 검색 결과가 없을 때 메세지 출력 */}
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
      {/* API 요청이 정상적으로 성공했을 때 사용자에게 메세지 출력 */}
      {nutrition && (
        <Flex
          direction="column"
          justifyContent="center"
          alignItems="center"
          mt="20px"
          width="100%"
          height="auto"
          minH="200px"
          borderRadius="10px"
          backgroundColor="#C7C7C7"
          // 화면 너비에 따른 반응형 여백 설정.
          margin={{ base: '20px 0 40px 0', md: '40px 0 60px 0' }}
          p={{ base: '20px', md: '40px' }}
          mb="50px"
        >
          <Flex
            justifyContent="center"
            // 화면 너비에 따른 반응형 간격 설정.
            gap={{ base: '20px', md: '60px', lg: '140px' }}
            mb="10px"
            flexWrap="wrap"
          >
            <Box textAlign="center">
              <Text variant="foodInfoText">
                {Number(nutrition.kcal).toFixed(0)} kcal
              </Text>
              <Text variant="foodInfoNameText">칼로리</Text>
            </Box>
            <Box textAlign="center">
              <Text variant="foodInfoText">{nutrition.protein} g</Text>
              <Text variant="foodInfoNameText">단백질</Text>
            </Box>
            <Box textAlign="center">
              <Text variant="foodInfoText">{nutrition.fat} g</Text>
              <Text variant="foodInfoNameText">지방</Text>
            </Box>
            <Box textAlign="center">
              <Text variant="foodInfoText">{nutrition.carbs} g</Text>
              <Text variant="foodInfoNameText">탄수화물</Text>
            </Box>
          </Flex>
          <FoodFeedback nutrition={nutrition} />{' '}
          {/* 영양 정보에 따른 상태 메시지 출력. */}
        </Flex>
      )}
    </>
  );
};
export default FoodContentsBox;
