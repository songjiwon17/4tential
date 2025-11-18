import { SimpleGrid, Text } from '@chakra-ui/react';
import WorkoutCard from './WorkoutCard';
import { mockWorkouts } from '../mock/mockWorkouts';

const WorkoutList = ({ selectedType, hasProfile, userGoal }) => {
  const filteredWorkouts =
    selectedType === '전체'
      ? mockWorkouts
      : mockWorkouts.filter((workout) => workout.type === selectedType);

  return (
    <>
      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        spacing={7}
        w="full"
        mt={10}
        alignSelf="center"
      >
        {filteredWorkouts.map((workout) => (
          <WorkoutCard
            key={workout.id}
            workout={workout}
            isRecommended={hasProfile && workout.type === userGoal}
          />
        ))}
      </SimpleGrid>

      {filteredWorkouts.length === 0 && (
        <Text color="#888" textAlign="center" mt={10}>
          해당 타입의 운동이 없습니다.
        </Text>
      )}
    </>
  );
};

export default WorkoutList;
