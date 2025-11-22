import { Flex } from '@chakra-ui/react';
import WorkoutTitle from './WorkoutTitle';
import WorkoutContentsBox from './WorkoutContentsBox';

const Workout = () => {
  return (
    <Flex
      w="100%"
      minH="100vh"
      alignItems="center"
      flexDirection="column"
      backgroundColor="#050202"
      overflowX="hidden"
    >
      <WorkoutTitle />
      <WorkoutContentsBox />
    </Flex>
  );
};

export default Workout;
