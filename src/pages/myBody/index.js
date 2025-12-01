import MyBodyPageTitle from './MyBodyPageTitle';
import MyBodyContentsBox from './MyBodyContentsBox';
import { Box } from '@chakra-ui/react';

const MyBody = () => {
  return (
    <Box w="100%" maxW="1200px" mx="auto">
      <MyBodyPageTitle />
      <MyBodyContentsBox />
    </Box>
  );
};

export default MyBody;
