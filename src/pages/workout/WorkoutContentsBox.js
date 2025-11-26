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

/**
 * ============================================
 * 운동 추천 페이지 - 메인 콘텐츠 박스
 * ============================================
 *
 * 역할:
 * 1. 운동 타입 버튼 표시 및 선택 관리
 * 2. 선택된 타입에 맞는 추천 식단 표시
 * 3. 필터링된 운동 목록 표시
 *
 * 데이터 흐름:
 * profileSavedAtom → useWorkout Hook → WorkoutList
 *
 * 주요 로직:
 * - 타입 버튼 배열: 프로필이 있으면 사용자 목표를 2번째에 배치
 * - 식단 선택: 선택된 타입 또는 사용자 목표에 맞는 식단
 * - 운동 필터링: useWorkout Hook에서 처리
 */
const WorkoutContentsBox = () => {
  const profileSave = useAtomValue(profileSavedAtom);

  // useWorkout hook에서 필요한 모든 데이터 가져오기
  const {
    selectedType, // 현재 선택된 타입
    handleTypeClick, // 타입 버튼 클릭 핸들러
    isProfileSaved, // 프로필 저장 여부
    workouts, // API로부터 받은 운동 데이터
    isLoading, // 로딩 상태
    error, // 에러 메시지
  } = useWorkout(profileSave);

  const hasProfile = isProfileSaved;
  const userGoal = profileSave?.type; // 사용자 운동 목표
  const userName = profileSave?.name;

  //각 타입 버튼 배열(위는 프로필 있을 때(선택한 타입이 2번 자리), 아래는 없을 때)
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

      {/* ===== 타입 버튼 영역 ===== */}
      <Flex mt={30} gap={6} alignSelf="center" flexWrap="wrap">
        {workoutTypes.map((type) => (
          <TypeButton
            key={type}
            value={type}
            isSelected={selectedType === type} // 선택된 버튼 강조
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
