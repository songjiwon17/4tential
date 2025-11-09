import MainTitle from '../../components/MainTitle';
import SubText from '../../components/SubText';
import { Flex, Box } from '@chakra-ui/react';
import FoodContentsBox from '../food/FoodContentsBox';

const Food = () => {
  return (
    <Flex
      direction={'column'}
      justifyContent={'center'}
      alignItems={'center'}
      pt="120px"
    >
      <MainTitle mainTitle={'식단검색'} mt={10} />
      <SubText
        subText={
          <>
            이 음식, 먹어도 괜찮을까? 궁금한 적이 있으신가요?
            <br />
            궁금한 식단을 검색해보세요. 영양 정보와 함께 식단관리에 도움을
            드릴게요.
          </>
        }
      />
      <Box pt="45px">
        <FoodContentsBox />
      </Box>
    </Flex>
  );
};

export default Food;
