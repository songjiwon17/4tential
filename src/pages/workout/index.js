import { Flex } from '@chakra-ui/react';
import WorkoutTitle from './component/WorkoutTitle';
import WorkoutContentsBox from './component/WorkoutContentsBox';

const Workout = () => {
  return (
    <Flex
      w="100vw"
      minH="100vh"
      mt="100px"
      alignItems="center"
      flexDirection="column"
      backgroundColor="#050202"
    >
      <WorkoutTitle />
      <WorkoutContentsBox />
    </Flex>
  );
};

export default Workout;
