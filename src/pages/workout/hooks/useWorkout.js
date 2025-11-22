import { useState, useEffect, useMemo } from 'react';
import physicalStrengthTypeImage from '../../../assets/images/physicalStrengthTypeImageNew.png';
import dietTypeImage from '../../../assets/images/dietTypeImageNew.png';
import MuscleStrengthImage from '../../../assets/images/muscleStrengthTypeImageNew.png';
import bodyshapeTypeImage from '../../../assets/images/bodyShapeTypeImageNew.png';

// API 설정
const API_KEY = '7YgpjvicYE1jZW73eCnv3Q==pE16rwA4B3IDCIKT';
const API_BASE_URL = 'https://api.api-ninjas.com/v1/exercises';

// 각 근육 부위별로 가져올 운동 리스트
const musclesToFetch = [
  'biceps', // 이두근 - 근력향상
  'chest', // 가슴 - 근력향상
  'triceps', // 삼두근 - 근력향상
  'quadriceps', // 대퇴사두근 - 체력향상
  'abdominals', // 복근 - 다이어트
  'glutes', // 둔근 - 체형교정
  'lower_back', // 하부 등 - 체형교정
  'hamstrings', // 햄스트링 - 체력향상
];

// 근육별 이미지 및 타입 매핑
const muscleConfig = {
  biceps: {
    image: MuscleStrengthImage,
    type: '근력향상',
  },
  chest: {
    image: MuscleStrengthImage,
    type: '근력향상',
  },
  triceps: {
    image: MuscleStrengthImage,
    type: '근력향상',
  },
  quadriceps: {
    image: physicalStrengthTypeImage,
    type: '체력향상',
  },
  hamstrings: {
    image: physicalStrengthTypeImage,
    type: '체력향상',
  },
  abdominals: {
    image: dietTypeImage,
    type: '다이어트',
  },
  glutes: {
    image: bodyshapeTypeImage,
    type: '체형교정',
  },
  lower_back: {
    image: bodyshapeTypeImage,
    type: '체형교정',
  },
};

// API 응답 변환
const formatExercise = (exercise, id, muscle) => {
  // 근육 부위에 따라 타입 자동 지정
  const config = muscleConfig[muscle] || {
    image: dietTypeImage,
    type: 'Diet',
  };

  // 난이도와 운동 타입에 따른 운동 정보 설정
  const getWorkoutDetails = (difficulty, exerciseType) => {
    const difficultyLevel = difficulty?.toLowerCase() || 'intermediate';

    switch (exerciseType) {
      case 'Diet': // 다이어트 - 고강도, 짧은 휴식
        return {
          time: difficultyLevel === 'beginner' ? '10~15분' : '15~20분',
          sets:
            difficultyLevel === 'beginner'
              ? '3세트 (세트당 30초~1분)'
              : '5세트 (세트당 1분)',
          rest: '세트 간 30초',
        };

      case 'BoostPhysical': // 체력향상 - 중강도, 지구력 중심
        return {
          time: '15~25분',
          sets:
            difficultyLevel === 'beginner'
              ? '3세트 (세트당 12회)'
              : '4세트 (세트당 15회)',
          rest: '세트 간 45~60초',
        };

      case 'IncreasedStrength': // 근력향상 - 고중량, 긴 휴식
        return {
          time: '20~30분',
          sets:
            difficultyLevel === 'beginner'
              ? '3세트 (세트당 8~10회)'
              : '5세트 (세트당 10~12회)',
          rest: '세트 간 60~90초',
        };

      case 'BodyShapeCorrection': // 체형교정 - 정확한 자세, 중간 강도
        return {
          time: '15~20분',
          sets:
            difficultyLevel === 'beginner'
              ? '3세트 (세트당 10회)'
              : '4세트 (세트당 12~15회)',
          rest: '세트 간 45~60초',
        };

      default:
        return {
          time: '15~20분',
          sets: '3세트 (세트당 10~12회)',
          rest: '세트 간 60초',
        };
    }
  };

  const workoutDetails = getWorkoutDetails(exercise.difficulty, config.type);

  // instructions 요약
  const getShortDescription = (instructions) => {
    if (!instructions) {
      // 타입별 기본 설명
      const typeDescriptions = {
        Diet: '체지방 감량에 효과적인 유산소 운동.',
        BoostPhysical: '심폐 지구력과 전반적인 체력을 향상.',
        IncreasedStrength: '근육량 증가와 근력 향상에 최적화된 운동.',
        BodyShapeCorrection: '자세 교정과 균형잡힌 신체 발달.',
      };
      return typeDescriptions[config.type] || '효과적인 운동입니다.';
    }

    // 첫 문장만
    const firstSentence = instructions.split('.')[0] + '.';

    // 길면 100자로
    if (firstSentence.length > 100) {
      return firstSentence.substring(0, 97) + '...';
    }

    return firstSentence;
  };

  return {
    id: id,
    title: exercise.name,
    imageUrl: config.image,
    type: config.type,
    time: workoutDetails.time,
    sets: workoutDetails.sets,
    rest: workoutDetails.rest,
    description: getShortDescription(exercise.instructions),
  };
};

const useWorkout = (profileSave) => {
  // useMemo로 프로필 저장 여부 체크
  const isProfileSaved = useMemo(() => {
    return profileSave?.name && profileSave.name.trim() !== '';
  }, [profileSave?.name]);

  // 프로필에 따라 초기 타입 설정
  const initialType = useMemo(() => {
    return isProfileSaved && profileSave?.type ? profileSave.type : '전체';
  }, [isProfileSaved, profileSave?.type]);

  const [selectedType, setSelectedType] = useState(initialType);
  const [workouts, setWorkouts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // profileSave가 변경되면 selectedType 업데이트
  useMemo(() => {
    if (isProfileSaved && profileSave?.type) {
      setSelectedType(profileSave.type);
    }
  }, [isProfileSaved, profileSave?.type]);

  const handleTypeClick = (type) => {
    setSelectedType(type);
  };

  // API에서 운동 데이터 가져오기
  useEffect(() => {
    const fetchAllWorkouts = async () => {
      setIsLoading(true);
      setError(null);
      let allWorkouts = [];
      let currentId = 1;

      try {
        for (const muscle of musclesToFetch) {
          const url = `${API_BASE_URL}?muscle=${muscle}&offset=0`;

          const response = await fetch(url, {
            method: 'GET',
            headers: { 'X-Api-Key': API_KEY },
          });

          if (!response.ok) {
            throw new Error(`${muscle} 운동 데이터를 불러오는데 실패했습니다.`);
          }

          const data = await response.json();

          const formattedExercises = data
            .slice(0, 4)
            // eslint-disable-next-line no-loop-func
            .map((exercise) => formatExercise(exercise, currentId++, muscle));

          allWorkouts = [...allWorkouts, ...formattedExercises];
        }

        setWorkouts(allWorkouts);
      } catch (err) {
        console.error('API 에러:', err);
        setError(err.message);
        setWorkouts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllWorkouts();
  }, []);

  // 필터링된 운동 목록
  const filteredWorkouts = useMemo(() => {
    return selectedType === '전체'
      ? workouts
      : workouts.filter((workout) => workout.type === selectedType);
  }, [selectedType, workouts]);

  return {
    selectedType,
    handleTypeClick,
    isProfileSaved,
    workouts: filteredWorkouts,
    isLoading,
    error,
  };
};

export default useWorkout;
