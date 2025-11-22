import { Image, Text, VStack, Box } from '@chakra-ui/react';
import Card from '../../../components/Card';
import Badge from '../../../components/Badge';
import TypeButton from '../../../components/TypeButton';

const WorkoutCard = ({ workout, isRecommended }) => {
  return (
    <Card isHighlighted={isRecommended} position="relative">
      {isRecommended && <Badge>⭐ 추천</Badge>}

      <VStack align="flex-start" spacing={0} p={0}>
        <Image
          src={workout.imageUrl}
          alt={workout.title}
          w="full"
          h={['150px', '220px']}
          objectFit="cover"
        />

        <VStack align="flex-start" spacing={3} p={5} w="full">
          <Box maxW="100%">
            <TypeButton value={workout.type} isSelected={isRecommended} />
          </Box>

          <Text fontSize="lg" fontWeight="bold" color="#fff" noOfLines={2}>
            {workout.title}
          </Text>

          <VStack
            fontSize="sm"
            color="#bbb"
            align="flex-start"
            spacing={1}
            lineHeight="1.6"
            w="full"
          >
            <Text>시간: {workout.time}</Text>
            <Text>세트: {workout.sets}</Text>
            {workout.rest && <Text>휴식: {workout.rest}</Text>}
            <Text mt={2} color="#888" fontSize="xs" noOfLines={3}>
              {workout.description}
            </Text>
          </VStack>
        </VStack>
      </VStack>
    </Card>
  );
};

export default WorkoutCard;
