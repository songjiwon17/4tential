import { SimpleGrid, Text, Box } from '@chakra-ui/react';
import WorkoutCard from './WorkoutCard';

const WorkoutList = ({ workouts, isLoading, error, hasProfile, userGoal }) => {
  // 1. 로딩 처리
  if (isLoading) {
    return (
      <Text textAlign="center" mt={10}>
        운동 데이터를 불러오는 중입니다.
      </Text>
    );
  }

  // 2. 에러 처리
  if (error) {
    return (
      <Text textAlign="center" mt={10}>
        운동 데이터를 불러오는 데 실패했습니다: {error}
      </Text>
    );
  }

  // 3. 데이터가 없을 때
  if (!workouts || workouts.length === 0) {
    return (
      <Text textAlign="center" mt={10}>
        해당 타입의 운동이 없습니다.
      </Text>
    );
  }

  return (
    <Box w="100%">
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 2 }}
        spacing={6}
        w="100%"
        mt={8}
      >
        {workouts.map((workout) => (
          <WorkoutCard
            key={workout.id}
            workout={workout}
            isRecommended={hasProfile && workout.type === userGoal}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default WorkoutList;
