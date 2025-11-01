import { Text } from '@chakra-ui/react';

const SubText = ({ subText = '' }) => {
  return (
    <Text mt={5} fontSize={'sm'} textAlign={'center'}>
      {subText}
    </Text>
  );
};

export default SubText;
