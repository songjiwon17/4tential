import { VStack } from '@chakra-ui/react';
import { useAtomValue } from 'jotai';
import { profileSavedAtom } from '../../store/atoms';
import MainTitle from '../../components/MainTitle';
import SubText from '../../components/SubText';

const WorkoutTitle = () => {
  // Atom에서 프로필 데이터 가져오기
  const profileSave = useAtomValue(profileSavedAtom);
  // 프로필 저장 여부 확인 (이름이 있고 빈 문자열이 아닐 때)
  const hasProfile = profileSave?.name && profileSave.name.trim() !== '';
  const userName = profileSave.name;

  return (
    <VStack align="center" spacing={2} mb={6}>
      <MainTitle mainTitle="운동 추천" />
      {/* 프로필 유무에 따라 "회원님" 또는 "{이름}님" */}
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
