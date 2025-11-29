// BMI 계산
export function getBmi(weight, height) {
  return weight && height ? weight / (height / 100) ** 2 : 0;
}

// BMI 등급 분류
export function getBmiClass(bmi) {
  if (bmi < 18.5) return '저체중';
  if (bmi < 23) return '정상';
  if (bmi < 25) return '과체중';
  if (bmi < 30) return '비만';
  if (bmi < 35) return '고도비만';
  return '초고도비만';
}

// 체지방률 계산
export function getFatPercent(weight, bodyFat) {
  return weight && bodyFat ? (bodyFat / weight) * 100 : 0;
}

// 정상체중 범위 계산 (BMI 18.5 ~ 23 기준)
export function getNormalWeightRange(height) {
  const heightM = height / 100;
  return {
    min: 18.5 * heightM * heightM, // 저체중 경계
    max: 23 * heightM * heightM, // 과체중 경계
  };
}

// 활동 수준 계수
const ACTIVITY_LEVELS = {
  sedentary: 1.2, // 앉아서 생활
  lightlyActive: 1.375, // 약간 활동적
  moderatelyActive: 1.55, // 적당히 활동적
  active: 1.725, // 활동적
  veryActive: 1.9, // 매우 활동적
};

// 목표 타입별 활동 수준 결정
export function getActivityLevel(goalType, bmi) {
  // 다이어트
  if (goalType === '다이어트') {
    if (bmi >= 30) return ACTIVITY_LEVELS.active; // 비만, 고도비만 → 활동적
    return ACTIVITY_LEVELS.moderatelyActive; // 과체중, 정상 → 적당히 활동적
  }
  // 근력향상
  if (goalType === '근력향상') {
    return ACTIVITY_LEVELS.active;
  }
  // 체력향상
  if (goalType === '체력향상') {
    return ACTIVITY_LEVELS.active;
  }
  // 체형교정
  if (goalType === '체형교정') {
    return ACTIVITY_LEVELS.moderatelyActive;
  }
  // 기본값
  return ACTIVITY_LEVELS.moderatelyActive;
}

// 기초대사량(BMR) 계산 - 미플린-세인트 제어르 공식 (남성)
// 남성: (10 × 체중) + (6.25 × 키) - (5 × 나이) + 5
export function getBMR(weight, height, age = 25) {
  if (!weight || !height) return 0;
  const base = 10 * weight + 6.25 * height - 5 * age;
  return base + 5; // 남성 공식
}

// 일일 총 에너지 소비량(TDEE) 계산
export function getTDEE(weight, height, age = 25, goalType = '다이어트') {
  const bmi = getBmi(weight, height);
  const bmr = getBMR(weight, height, age);
  const activityLevel = getActivityLevel(goalType, bmi);
  return bmr * activityLevel;
}

// 목표별 권장 칼로리 계산
export function getTargetCalories(
  weight,
  height,
  age = 25,
  goalType = '다이어트'
) {
  const tdee = getTDEE(weight, height, age, goalType);

  // 다이어트: TDEE에서 500kcal 감소 (주당 약 0.5kg 감량)
  if (goalType === '다이어트') {
    return Math.max(1200, tdee - 500); // 최소 1200kcal 보장
  }
  // 근력향상: TDEE에서 300kcal 증가 (근육 성장 지원)
  if (goalType === '근력향상') {
    return tdee + 300;
  }
  // 체력향상: TDEE 유지 또는 약간 증가
  if (goalType === '체력향상') {
    return tdee + 200;
  }
  // 체형교정: TDEE 유지
  if (goalType === '체형교정') {
    return tdee;
  }
  return tdee;
}

// ============================================
// 🔧 개선된 체형 예측 공식 (초보자 남성 타겟)
// ============================================

// 목표별 설정값 (초보자 남성 기준)
const GOAL_CONFIGS = {
  다이어트: {
    description: '체중/체지방 감량 집중',
    monthlyWeightLoss: 1.5, // 월 1.5kg 감량
    muscleGainRate: 0.2, // 월 0.2kg 근육 증가 (Newbie Gains)
    targetType: 'weight_loss',
  },
  근력향상: {
    description: '근육량 증가 집중 (리컴포지션)',
    monthlyWeightLoss: 0, // 체중 유지
    muscleGainRate: 0.7, // 월 0.7kg 근육 증가 (1년차)
    fatLossRate: 0.5, // 월 0.5kg 체지방 감소
    targetType: 'recomp',
  },
  체력향상: {
    description: '지구력/전반적 체력 향상',
    monthlyWeightLoss: 0.5, // 월 0.5kg 감량
    muscleGainRate: 0.4, // 월 0.4kg 근육 증가
    targetType: 'cardio',
  },
  체형교정: {
    description: '균형잡힌 체형 만들기 (초보자 추천)',
    monthlyWeightLoss: 0.3, // 월 0.3kg 감량
    muscleGainRate: 0.5, // 월 0.5kg 근육 증가
    targetType: 'balance',
  },
};

// 체지방 최소값 계산 (남성: 필수 체지방 5%)
function getMinBodyFat(weight) {
  return weight * 0.05;
}

// 근육량 최대값 계산 (체중 대비)
function getMaxMuscle(weight, height) {
  const bmi = getBmi(weight, height);

  // 정상 체중: 최대 근육 비율 45%
  // 저체중/과체중: 최대 40%
  if (bmi >= 18.5 && bmi < 25) {
    return weight * 0.45;
  }
  return weight * 0.4;
}

// 비선형 근육 증가량 계산 (초보자도 시간 지날수록 증가율 감소)
function getMuscleGainNonLinear(months, baseRate) {
  let totalGain = 0;

  for (let i = 0; i < months; i++) {
    const year = Math.floor(i / 12);

    // 1년차: 100% 속도
    // 2년차: 50% 속도
    // 3년차 이후: 20% 속도
    let rate;
    if (year === 0) {
      rate = baseRate; // 1년차
    } else if (year === 1) {
      rate = baseRate * 0.5; // 2년차
    } else {
      rate = baseRate * 0.2; // 3년차 이후
    }

    totalGain += rate;
  }

  return totalGain;
}

// 체중 감량 시 기타 성분(수분, 내장 등) 감소량 계산
function getEtcWeightChange(totalWeightLoss) {
  // 체중 감량 시 총 감량의 약 10-15%가 수분/기타 성분
  return totalWeightLoss * 0.12;
}

// 입력값 검증
function validateInputs(weight, height, muscle, bodyFat, months) {
  // 1. months 범위 체크
  if (months < 0) {
    throw new Error('예측 기간은 0개월 이상이어야 합니다.');
  }
  if (months > 60) {
    throw new Error('예측 기간은 최대 60개월(5년)까지만 가능합니다.');
  }

  // 2. 체성분 합계 체크
  const totalBodyComp = muscle + bodyFat;
  if (totalBodyComp > weight * 0.95) {
    throw new Error(
      `체성분 합계(근육 ${muscle}kg + 체지방 ${bodyFat}kg = ${totalBodyComp.toFixed(
        1
      )}kg)가 체중(${weight}kg)의 95%를 초과합니다.`
    );
  }

  // 3. 최소값 체크
  if (weight <= 0 || height <= 0) {
    throw new Error('체중과 키는 0보다 커야 합니다.');
  }

  if (muscle < 0 || bodyFat < 0) {
    throw new Error('근육량과 체지방량은 0 이상이어야 합니다.');
  }

  // 4. 체지방 최소값 체크 (남성: 3kg 이상)
  if (bodyFat < 3) {
    throw new Error('체지방량은 최소 3kg 이상이어야 합니다.');
  }
}

// ============================================
// 메인 함수: 목표/기간별 체형 예측 (남성 전용)
// ============================================
export function getBodyPrediction({
  weight,
  height = 170,
  muscle,
  bodyFat,
  months,
  goalType,
}) {
  // 1. 입력값 검증
  validateInputs(weight, height, muscle, bodyFat, months);

  // 2. 초기 상태 계산
  const etcWeightBefore = weight - muscle - bodyFat; // 기타 성분 (뼈, 내장, 수분 등)
  const { min: minWeight, max: maxWeight } = getNormalWeightRange(height);
  const currentBmi = getBmi(weight, height);

  // 3. 목표별 설정값 가져오기
  const config = GOAL_CONFIGS[goalType] || GOAL_CONFIGS['다이어트'];

  // 4. 변화량 계산
  let newWeight, newMuscle, newBodyFat;

  // ==========================================
  // 4-1. 다이어트
  // ==========================================
  if (goalType === '다이어트') {
    // 근육 변화 (Newbie Gains - 비선형)
    const muscleChange = getMuscleGainNonLinear(months, config.muscleGainRate);

    // 목표 체중 감소
    const targetWeightLoss = months * config.monthlyWeightLoss;

    // 실제 체중 감소 (정상체중 이하로 안 내려감)
    const actualWeightLoss = Math.min(targetWeightLoss, weight - minWeight);

    // 기타 성분 감소 (체중 감소의 12%)
    const etcChange = getEtcWeightChange(actualWeightLoss);

    // 체지방 감소 = 체중 감소 - 근육 증가 - 기타 감소
    const fatChange = actualWeightLoss - muscleChange - etcChange;

    // 최종 값
    newWeight = weight - actualWeightLoss;
    newMuscle = muscle + muscleChange;
    newBodyFat = bodyFat - fatChange;
  }
  // ==========================================
  // 4-2. 근력향상 (리컴포지션)
  // ==========================================
  else if (goalType === '근력향상') {
    // 과체중/비만: 정상체중까지 먼저 감량
    if (currentBmi >= 23) {
      const monthsToNormal = Math.ceil((weight - maxWeight) / 1.5);

      if (months <= monthsToNormal) {
        // 정상체중 도달 전: 다이어트 공식 적용
        const muscleChange = getMuscleGainNonLinear(months, 0.2);
        const actualWeightLoss = Math.min(months * 1.5, weight - maxWeight);
        const etcChange = getEtcWeightChange(actualWeightLoss);
        const fatChange = actualWeightLoss - muscleChange - etcChange;

        newWeight = weight - actualWeightLoss;
        newMuscle = muscle + muscleChange;
        newBodyFat = bodyFat - fatChange;
      } else {
        // 정상체중 도달 후: 리컴포지션
        const extraMonths = months - monthsToNormal;

        // 1단계: 다이어트
        const muscleAfterDiet =
          muscle + getMuscleGainNonLinear(monthsToNormal, 0.2);
        const weightLossDiet = weight - maxWeight;
        const etcChangeDiet = getEtcWeightChange(weightLossDiet);
        const fatAfterDiet =
          bodyFat -
          (weightLossDiet - (muscleAfterDiet - muscle) - etcChangeDiet);

        // 2단계: 리컴포지션 (체중 유지, 근육↑ 체지방↓)
        const muscleGainRecomp = getMuscleGainNonLinear(
          extraMonths,
          config.muscleGainRate
        );
        const fatLossRecomp = getMuscleGainNonLinear(
          extraMonths,
          config.fatLossRate
        );

        newWeight = maxWeight; // 체중 유지
        newMuscle = muscleAfterDiet + muscleGainRecomp;
        newBodyFat = fatAfterDiet - fatLossRecomp;
      }
    }
    // 저체중: 체중 증가 후 리컴포지션
    else if (currentBmi < 18.5) {
      const monthsToNormal = Math.ceil((minWeight - weight) / 0.8);

      if (months <= monthsToNormal) {
        // 정상체중 도달 전: 체중 + 근육 증가
        const muscleChange = getMuscleGainNonLinear(months, 0.5);
        const weightGain = Math.min(months * 0.8, minWeight - weight);
        const fatChange = weightGain - muscleChange; // 나머지는 체지방

        newWeight = weight + weightGain;
        newMuscle = muscle + muscleChange;
        newBodyFat = bodyFat + fatChange;
      } else {
        // 정상체중 도달 후: 리컴포지션
        const extraMonths = months - monthsToNormal;

        // 1단계: 증량
        const muscleAfterGain =
          muscle + getMuscleGainNonLinear(monthsToNormal, 0.5);
        const weightGain = minWeight - weight;
        const fatAfterGain =
          bodyFat + (weightGain - (muscleAfterGain - muscle));

        // 2단계: 리컴포지션
        const muscleGainRecomp = getMuscleGainNonLinear(
          extraMonths,
          config.muscleGainRate
        );
        const fatLossRecomp = getMuscleGainNonLinear(
          extraMonths,
          config.fatLossRate
        );

        newWeight = minWeight; // 체중 유지
        newMuscle = muscleAfterGain + muscleGainRecomp;
        newBodyFat = fatAfterGain - fatLossRecomp;
      }
    }
    // 이미 정상체중: 바로 리컴포지션
    else {
      const muscleChange = getMuscleGainNonLinear(
        months,
        config.muscleGainRate
      );
      const fatChange = getMuscleGainNonLinear(months, config.fatLossRate);

      newWeight = weight; // 체중 유지
      newMuscle = muscle + muscleChange;
      newBodyFat = bodyFat - fatChange;
    }
  }
  // ==========================================
  // 4-3. 체력향상
  // ==========================================
  else if (goalType === '체력향상') {
    const muscleChange = getMuscleGainNonLinear(months, config.muscleGainRate);
    const targetWeightLoss = months * config.monthlyWeightLoss;
    const actualWeightLoss = Math.min(targetWeightLoss, weight - minWeight);
    const etcChange = getEtcWeightChange(actualWeightLoss);
    const fatChange = actualWeightLoss - muscleChange - etcChange;

    newWeight = weight - actualWeightLoss;
    newMuscle = muscle + muscleChange;
    newBodyFat = bodyFat - fatChange;
  }
  // ==========================================
  // 4-4. 체형교정
  // ==========================================
  else if (goalType === '체형교정') {
    const muscleChange = getMuscleGainNonLinear(months, config.muscleGainRate);
    const targetWeightLoss = months * config.monthlyWeightLoss;
    const actualWeightLoss = Math.min(targetWeightLoss, weight - minWeight);
    const etcChange = getEtcWeightChange(actualWeightLoss);
    const fatChange = actualWeightLoss - muscleChange - etcChange;

    newWeight = weight - actualWeightLoss;
    newMuscle = muscle + muscleChange;
    newBodyFat = bodyFat - fatChange;
  }
  // ==========================================
  // 4-5. 기타 (기본값)
  // ==========================================
  else {
    const muscleChange = getMuscleGainNonLinear(months, 0.3);
    const targetWeightLoss = months * 1.0;
    const actualWeightLoss = Math.min(targetWeightLoss, weight - minWeight);
    const etcChange = getEtcWeightChange(actualWeightLoss);
    const fatChange = actualWeightLoss - muscleChange - etcChange;

    newWeight = weight - actualWeightLoss;
    newMuscle = muscle + muscleChange;
    newBodyFat = bodyFat - fatChange;
  }

  // 5. 안전장치 적용
  // 5-1. 체지방 최소값 (남성: 5%)
  const minBodyFat = getMinBodyFat(newWeight);
  newBodyFat = Math.max(minBodyFat, newBodyFat);

  // 5-2. 근육량 최대값
  const maxMuscle = getMaxMuscle(newWeight, height);
  newMuscle = Math.min(maxMuscle, newMuscle);

  // 5-3. 체중 범위 (안전장치)
  newWeight = Math.max(minWeight * 0.9, newWeight); // 정상체중의 90%까지 허용

  // 6. 최종 반환
  return {
    weight: Number(newWeight.toFixed(1)),
    muscle: Number(newMuscle.toFixed(1)),
    bodyFat: Number(newBodyFat.toFixed(1)),
  };
}
