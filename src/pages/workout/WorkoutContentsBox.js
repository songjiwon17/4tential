import { Flex } from '@chakra-ui/react';
import { useAtomValue } from 'jotai';
import { profileSavedAtom, ProfileTypes } from '../../store/atoms';
import ContentsBox from '../../components/ContentsBox';
import TypeButton from '../../components/TypeButton';
import SubText from '../../components/SubText';
import Line from '../../components/Line';
import useWorkout from './hooks/useWorkout';
import MealPlanCard from './component/MealPlanCard';
import WorkoutList from './component/WorkoutList';
import { mealPlansByType, mockMealPlan } from './mock/mockWorkouts';

const WorkoutContentsBox = () => {
  const profileSave = useAtomValue(profileSavedAtom);

  // useWorkout hook에서 필요한 모든 데이터 가져오기
  const {
    selectedType,
    handleTypeClick,
    isProfileSaved,
    workouts, // API로부터 받은 운동 데이터
    isLoading,
    error,
  } = useWorkout(profileSave);

  const hasProfile = isProfileSaved;
  const userGoal = profileSave?.type;
  const userName = profileSave?.name;

  const workoutTypes = hasProfile
    ? [
        '전체',
        userGoal,
        ...Object.values(ProfileTypes).filter((t) => t !== userGoal),
      ]
    : ['전체', ...Object.values(ProfileTypes)];

  // 선택된 타입에 따른 식단
  const getCurrentMealPlan = () => {
    if (selectedType === '전체') {
      return hasProfile && userGoal ? mealPlansByType[userGoal] : mockMealPlan;
    }
    return mealPlansByType[selectedType] || mockMealPlan;
  };

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
        mealPlan={getCurrentMealPlan()}
        userGoal={hasProfile ? userGoal : null}
        userName={hasProfile ? userName : null}
      />

      {/* API 데이터와 상태를 WorkoutList에 전달 */}
      <WorkoutList
        workouts={workouts}
        isLoading={isLoading}
        error={error}
        selectedType={selectedType}
        hasProfile={hasProfile}
        userGoal={userGoal}
      />
    </ContentsBox>
  );
};

export default WorkoutContentsBox;
