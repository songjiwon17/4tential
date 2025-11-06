import MainTitle from '../../components/MainTitle';
import { Flex, Text } from '@chakra-ui/react';
import TypeButton from '../../components/TypeButton';
import WorkoutList from './WorkoutList';

const Workout = () => {
  return (
    <Flex
      w="100vw"
      minh="100vh"
      mt="100px"
      alignItems="center"
      flexDirection="column"
      backgroundColor="#050202"
    >
      <MainTitle mainTitle={'운동 추천'} />
      <Text variant="profileInputText" mt={30} alignSelf="center">
        회원님이 입력하신 신체정보를 기반으로 운동 루틴과 식단을 추천합니다.
      </Text>
      <Text variant="profileInputText" mt={30} alignSelf="center">
        이제 당신만의 운동 루틴이 완성됩니다!
      </Text>

      <Flex mt={100} gap={6} alignSelf="center">
        <TypeButton value={'다이어트'} />
        <TypeButton value={'체력향상'} />
        <TypeButton value={'근력향상'} />
        <TypeButton value={'체형교정'} />
      </Flex>

      <Text variant="profileInputText" mt={30} alignSelf="center">
        자신에게 맞는 운동 목적을 선택해 클릭해보세요. 운동을 추천해드립니다.
      </Text>
      <WorkoutList />
    </Flex>
  );
};

export default Workout;
