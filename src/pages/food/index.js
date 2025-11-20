import { Flex, Box } from '@chakra-ui/react';
import FoodContentsBox from '../food/FoodContentsBox';
import FoodTitle from './FoodTitle';

const Food = () => {
  return (
    <Flex direction={'column'} justifyContent={'center'} alignItems={'center'}>
      <FoodTitle />
      <Box
        mt="45px"
        w={{ base: '100%', lg: '1000px' }}
        px={{ base: '20px', lg: '0' }}
      >
        <FoodContentsBox />
      </Box>
    </Flex>
  );
};

export default Food;
