import { VStack } from '@chakra-ui/react';
import { useAtomValue } from 'jotai';
import { profileSavedAtom } from '../../store/atoms';
import MainTitle from '../../components/MainTitle';
import SubText from '../../components/SubText';

const WorkoutTitle = () => {
  const profileSave = useAtomValue(profileSavedAtom);
  const hasProfile = profileSave?.name && profileSave.name.trim() !== '';
  const userName = profileSave.name;

  return (
    <VStack align="center" spacing={2} mb={6}>
      <MainTitle mainTitle="운동 추천" />
      <SubText
        subText={
          <>
            {hasProfile ? `${userName}님이` : '회원님이'} 입력하신 신체정보를
            기반으로 운동 루틴과 식단을 추천합니다.
            <br />
            이제 당신만의 운동 루틴이 완성됩니다!
          </>
        }
      />
    </VStack>
  );
};

export default WorkoutTitle;
