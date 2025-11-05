import { Text } from '@chakra-ui/react';

const SubText = ({ subText = '' }) => {
  return (
    <Text variant="subText" mt={5} textAlign={'center'}>
      {subText}
    </Text>
  );
};

export default SubText;
