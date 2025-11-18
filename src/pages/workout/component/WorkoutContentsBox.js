import ContentsBox from '../../../components/ContentsBox';
import { Flex } from '@chakra-ui/react';
import { useAtomValue } from 'jotai';
import { profileSavedAtom, ProfileTypes } from '../../../store/atoms';
import TypeButton from '../../../components/TypeButton';
import SubText from '../../../components/SubText';
import Line from '../../../components/Line';
import useWorkout from '../hooks/useWorkout';
import MealPlanCard from './MealPlanCard';
import WorkoutList from './WorkoutList';
import { mockWorkouts, mockMealPlan } from '../mock/mockWorkouts';

const WorkoutContentsBox = () => {
  const profileSave = useAtomValue(profileSavedAtom);
  const { selectedType, handleTypeClick, isProfileSaved } = useWorkout(
    mockWorkouts,
    profileSave
  );

  const hasProfile = isProfileSaved();
  const userGoal = profileSave.type;
  const userName = profileSave.name;

  const workoutTypes = hasProfile
    ? [
        '전체',
        userGoal,
        ...Object.values(ProfileTypes).filter((t) => t !== userGoal),
      ]
    : ['전체', ...Object.values(ProfileTypes)];

  return (
    <ContentsBox>
      <Line />

      <Flex mt={30} gap={6} alignSelf="center" flexWrap="wrap">
        {workoutTypes.map((type) => (
          <TypeButton
            key={type}
            value={type}
            isSelected={selectedType === type}
            onChange={handleTypeClick}
          />
        ))}
      </Flex>

      <SubText
        subText={
          hasProfile
            ? `${userName}님의 목표 (${userGoal})에 맞는 운동을 추천해드립니다.`
            : '자신에게 맞는 운동 목적을 선택해 클릭해보세요. 운동을 추천해드립니다.'
        }
      />

      <MealPlanCard
        mealPlan={mockMealPlan}
        userGoal={hasProfile ? userGoal : null}
        userName={hasProfile ? userName : null}
      />

      <WorkoutList
        selectedType={selectedType}
        hasProfile={hasProfile}
        userGoal={userGoal}
      />
    </ContentsBox>
  );
};

export default WorkoutContentsBox;
