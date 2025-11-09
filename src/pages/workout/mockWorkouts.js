import physicalStrengthTypeImage from '../../assets/images/physicalStrengthTypeImage.png';
import dietTypeImage from '../../assets/images/dietTypeImage.png';
import MuscleStrengthImage from '../../assets/images/muscleStrengthTypeImage.png';

export const mockWorkouts = [
  {
    title: '버피 테스트 (Burpee Test)',
    imageUrl: dietTypeImage,
    type: '다이어트',
    time: '15~20분',
    sets: '5세트 (세트당 10~15회)',
    rest: '세트 간 30~60초',
    description: '전신 근육을 빠르게 소모해 체지방 감량에 효과적',
  },
  {
    title: '점핑 잭 (Jumping Jack)',
    imageUrl: dietTypeImage,
    type: '다이어트',
    time: '10~15분',
    sets: '4세트 (세트당 1분 수행 → 30초 휴식)',
    rest: '30초',
    description: '전신 근육을 빠르게 소모해 체지방 감량에 효과적',
  },
  {
    title: '런지 (Lunge)',
    imageUrl: physicalStrengthTypeImage, //dietTypeImage랑 physicalStrengthTypeImage랑 이미지 겹칩니다!
    type: '체력향상',
    time: '15~20분',
    sets: '5세트 (세트당 10~15회)',
    rest: '세트 간 30~60초',
    description: '전신 근육을 빠르게 소모해 체지방 감량에 효과적',
  },
  {
    title: '마운틴 클라이머 (Mountain Climber)',
    imageUrl: physicalStrengthTypeImage, //위와 동일!
    type: '근력향상',
    time: '15~20분',
    sets: '5세트 (세트당 10~15회)',
    rest: '세트 간 30~60초',
    description: '전신 근육을 빠르게 소모해 체지방 감량에 효과적',
  },
  {
    title: '푸쉬업 (Push-Up)',
    imageUrl: MuscleStrengthImage,
    type: '근력향상',
    time: '15~20분',
    sets: '5세트 (세트당 10~15회)',
    rest: '세트 간 30~60초',
    description: '전신 근육을 빠르게 소모해 체지방 감량에 효과적',
  },
  {
    title: '스쿼트 (Squat)',
    imageUrl: MuscleStrengthImage,
    type: '다이어트',
    time: '15~20분',
    sets: '5세트 (세트당 10~15회)',
    rest: '세트 간 30~60초',
    description: '전신 근육을 빠르게 소모해 체지방 감량에 효과적',
  },
];
