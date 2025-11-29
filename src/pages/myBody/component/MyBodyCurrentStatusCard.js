import { Flex, Text, Box, Badge } from '@chakra-ui/react';
import { getFatPercent } from '../utils/MyBodyCalc';

const CurrentStatusCard = ({
  userName = '사용자',
  goalType = '다이어트',
  height,
  weight,
  muscle,
  bodyFat,
}) => {
  const fatPercent = getFatPercent(weight, bodyFat);

  const getGoalColor = () => {
    switch (goalType) {
      case '다이어트':
        return 'red';
      case '근력향상':
        return 'blue';
      case '체력향상':
        return 'green';
      case '체형교정':
        return 'purple';
      default:
        return 'gray';
    }
  };

  return (
    <Box
      bg="rgba(255, 255, 255, 0.03)"
      borderRadius="16px"
      border="1px solid rgba(255, 255, 255, 0.1)"
      p={6}
      mb={8}
      mt={6}
    >
      {/* 제목 + 목표 배지 */}
      <Flex justify="space-between" align="center" mb={4}>
        <Text color="#FFF" fontSize="lg" fontWeight="bold">
          {userName}님의 현재 상태
        </Text>
        <Badge
          colorScheme={getGoalColor()}
          fontSize="sm"
          px={4}
          py={1}
          borderRadius="full"
        >
          {goalType}
        </Badge>
      </Flex>

      {/* 체성분 정보 */}
      <Flex
        bg="rgba(255, 255, 255, 0.05)"
        borderRadius="12px"
        p={4}
        justify="space-around"
      >
        <Flex direction="column" align="center" flex={1}>
          <Text color="#888" fontSize="xs" mb={1}>
            키
          </Text>
          <Text color="#FFF" fontSize="md" fontWeight="bold">
            {height}cm
          </Text>
        </Flex>

        <Box w="1px" bg="rgba(255, 255, 255, 0.1)" mx={2} />

        <Flex direction="column" align="center" flex={1}>
          <Text color="#888" fontSize="xs" mb={1}>
            체중
          </Text>
          <Text color="#FFF" fontSize="md" fontWeight="bold">
            {weight}kg
          </Text>
        </Flex>

        <Box w="1px" bg="rgba(255, 255, 255, 0.1)" mx={2} />

        <Flex direction="column" align="center" flex={1}>
          <Text color="#888" fontSize="xs" mb={1}>
            근육량
          </Text>
          <Text color="#FFF" fontSize="md" fontWeight="bold">
            {muscle}kg
          </Text>
        </Flex>

        <Box w="1px" bg="rgba(255, 255, 255, 0.1)" mx={2} />

        <Flex direction="column" align="center" flex={1}>
          <Text color="#888" fontSize="xs" mb={1}>
            체지방률
          </Text>
          <Text color="#FFF" fontSize="md" fontWeight="bold">
            {fatPercent.toFixed(1)}%
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default CurrentStatusCard;
