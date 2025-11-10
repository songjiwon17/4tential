import { Flex, Box } from '@chakra-ui/react';
import FoodContentsBox from '../food/FoodContentsBox';
import FoodTitle from './FoodTitle';

const Food = () => {
  return (
    <Flex
      direction={'column'}
      justifyContent={'center'}
      alignItems={'center'}
      pt="120px"
    >
      <FoodTitle />
      <Box mt="45px">
        <FoodContentsBox />
      </Box>
    </Flex>
  );
};

export default Food;
