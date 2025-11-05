import { Text } from '@chakra-ui/react';

const MainTitle = ({ mainTitle = '' }) => {
  return (
    <Text mt={10} fontWeight={'bold'} textAlign={'center'}>
      {mainTitle}
    </Text>
  );
};

export default MainTitle;
