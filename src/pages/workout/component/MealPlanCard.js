import { HStack, VStack, Text } from '@chakra-ui/react';
import Card from '../../../components/Card';

const MealPlanCard = ({ mealPlan }) => {
  return (
    <Card
      w="full"
      borderRadius="15px"
      border="1px solid #4A90E2"
      bg="linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)"
      p={6}
      mt={8}
      mb={6}
      alignSelf="center"
      _hover={{
        transform: 'translateY(-5px)',
        boxShadow: '0 8px 20px rgba(74, 144, 226, 0.3)',
      }}
    >
      <HStack
        justify="space-between"
        align="flex-start"
        spacing={6}
        flexWrap="wrap"
      >
        <VStack align="flex-start" spacing={3} flex={1} minW="300px">
          <HStack>
            <Text fontSize="xl" fontWeight="bold" color="#fff">
              {mealPlan.title}
            </Text>
          </HStack>

          <VStack align="flex-start" spacing={2} w="full">
            <HStack>
              <Text color="#4A90E2" fontWeight="semibold" minW="60px">
                아침:
              </Text>
              <Text color="#ddd">{mealPlan.breakfast}</Text>
            </HStack>
            <HStack>
              <Text color="#4A90E2" fontWeight="semibold" minW="60px">
                점심:
              </Text>
              <Text color="#ddd">{mealPlan.lunch}</Text>
            </HStack>
            <HStack>
              <Text color="#4A90E2" fontWeight="semibold" minW="60px">
                저녁:
              </Text>
              <Text color="#ddd">{mealPlan.dinner}</Text>
            </HStack>
          </VStack>
        </VStack>

        <VStack
          bg="rgba(74, 144, 226, 0.1)"
          borderRadius="10px"
          p={4}
          spacing={2}
          minW="150px"
        >
          <Text fontSize="sm" color="#4A90E2" fontWeight="semibold">
            영양 정보
          </Text>
          <Text fontSize="lg" fontWeight="bold" color="#fff">
            {mealPlan.calories}
          </Text>
          <Text fontSize="sm" color="#ddd">
            단백질: {mealPlan.protein}
          </Text>
        </VStack>
      </HStack>
    </Card>
  );
};

export default MealPlanCard;
