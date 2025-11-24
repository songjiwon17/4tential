import { Text } from '@chakra-ui/react';

const MyBodyTitle = ({ children, mb = 8, ...props }) => {
  return (
    <Text textStyle="sectionTitle" mb={mb} {...props}>
      {children}
    </Text>
  );
};

export default MyBodyTitle;
