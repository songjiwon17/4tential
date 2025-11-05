import { Text } from '@chakra-ui/react';

const MainTitle = ({ mainTitle = '', fontWeight = 'bold' }) => {
  return (
    <Text mt={5} fontWeight={fontWeight} textAlign={'center'}>
      {mainTitle}
    </Text>
  );
};

export default MainTitle;
