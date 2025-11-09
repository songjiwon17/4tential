import { SimpleGrid } from '@chakra-ui/react';
import WorkoutCard from './WorkoutCard';
import { mockWorkouts } from './mockWorkouts';

const WorkoutList = () => {
  return (
    <SimpleGrid
      columns={{ base: 1, md: 2 }} // 모바일(base)에서는 1열, 중간 화면(md)부터 2열
      spacing={7}
      w="60vw"
      mt="50px"
    >
      {mockWorkouts.map((workout, index) => (
        <WorkoutCard
          key={index}
          title={workout.title}
          imageUrl={workout.imageUrl}
          type={workout.type}
          time={workout.time}
          sets={workout.sets}
          rest={workout.rest}
          description={workout.description}
        />
      ))}
    </SimpleGrid>
  );
};

export default WorkoutList;
