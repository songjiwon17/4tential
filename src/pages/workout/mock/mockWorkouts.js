import { ProfileTypes } from '../../../store/atoms';
import physicalStrengthTypeImage from '../../../assets/images/physicalStrengthTypeImage.png';
import dietTypeImage from '../../../assets/images/dietTypeImage.png';
import MuscleStrengthImage from '../../../assets/images/muscleStrengthTypeImage.png';

export const mockWorkouts = [
  {
    id: 1,
    title: '버피 테스트 (Burpee Test)',
    imageUrl: dietTypeImage,
    type: ProfileTypes.Diet,
    time: '15~20분',
    sets: '5세트 (세트당 10~15회)',
    rest: '세트 간 30~60초',
    description: '전신 근육을 빠르게 소모해 체지방 감량에 효과적',
  },
  {
    id: 2,
    title: '점핑 잭 (Jumping Jack)',
    imageUrl: dietTypeImage,
    type: ProfileTypes.Diet,
    time: '10~15분',
    sets: '4세트 (세트당 1분 수행)',
    rest: '30초',
    description: '유산소 운동으로 칼로리 소모 극대화',
  },
  {
    id: 3,
    title: '런지 (Lunge)',
    imageUrl: physicalStrengthTypeImage,
    type: ProfileTypes.BoostPhysical,
    time: '15~20분',
    sets: '5세트 (세트당 10~15회)',
    rest: '세트 간 30~60초',
    description: '하체 근력과 균형감각 향상',
  },
  {
    id: 4,
    title: '마운틴 클라이머 (Mountain Climber)',
    imageUrl: physicalStrengthTypeImage,
    type: ProfileTypes.IncreasedStrength,
    time: '15~20분',
    sets: '5세트 (세트당 10~15회)',
    rest: '세트 간 30~60초',
    description: '코어 근력 강화 및 심폐 지구력 향상',
  },
  {
    id: 5,
    title: '푸쉬업 (Push-Up)',
    imageUrl: MuscleStrengthImage,
    type: ProfileTypes.IncreasedStrength,
    time: '15~20분',
    sets: '5세트 (세트당 10~15회)',
    rest: '세트 간 30~60초',
    description: '상체 근력 발달에 최적화된 운동',
  },
  {
    id: 6,
    title: '스쿼트 (Squat)',
    imageUrl: MuscleStrengthImage,
    type: ProfileTypes.Diet,
    time: '15~20분',
    sets: '5세트 (세트당 10~15회)',
    rest: '세트 간 30~60초',
    description: '하체 전반의 근력과 기초 체력 향상',
  },
];

export const mockMealPlan = {
  title: '오늘의 추천 식단',
  breakfast: '오트밀 + 바나나 + 아몬드',
  lunch: '닭가슴살 샐러드 + 현미밥',
  dinner: '연어 구이 + 브로콜리 + 고구마',
  calories: '1,800 kcal',
  protein: '120g',
};
