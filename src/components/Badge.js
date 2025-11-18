import { Box } from '@chakra-ui/react';

const Badge = ({ children, ...props }) => {
  return (
    <Box
      position="absolute"
      top={2}
      right={2}
      bg="#4A90E2"
      color="white"
      px={3}
      py={1}
      borderRadius="full"
      fontSize="xs"
      fontWeight="bold"
      zIndex={1}
      {...props}
    >
      {children}
    </Box>
  );
};

export default Badge;
