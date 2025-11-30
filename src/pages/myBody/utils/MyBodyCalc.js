// =========================
// 기본 지표 계산
// =========================

// BMI 계산
export function getBmi(weight, height) {
  return weight && height ? weight / (height / 100) ** 2 : 0;
}

// BMI 등급 분류 (대한비만학회 기준과 유사)
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
    min: 18.5 * heightM * heightM,
    max: 23 * heightM * heightM,
  };
}

// =========================
// BMR / TDEE / 칼로리
// =========================

const ACTIVITY_LEVELS = {
  sedentary: 1.2,
  lightlyActive: 1.375,
  moderatelyActive: 1.55,
  active: 1.725,
  veryActive: 1.9,
};

// 목표 타입별 활동 수준 결정
export function getActivityLevel(goalType, bmi) {
  if (goalType === '다이어트') {
    if (bmi >= 30) return ACTIVITY_LEVELS.active;
    return ACTIVITY_LEVELS.moderatelyActive;
  }
  if (goalType === '근력향상') return ACTIVITY_LEVELS.active;
  if (goalType === '체력향상') return ACTIVITY_LEVELS.active;
  if (goalType === '체형교정') return ACTIVITY_LEVELS.moderatelyActive;
  return ACTIVITY_LEVELS.moderatelyActive;
}

// 기초대사량(BMR) 계산 - 미플린-세인트 제오르 (남성)
export function getBMR(weight, height, age = 25) {
  if (!weight || !height) return 0;
  const base = 10 * weight + 6.25 * height - 5 * age;
  return base + 5; // 남성 공식
}

// 일일 총 에너지 소비량(TDEE)
export function getTDEE(weight, height, age = 25, goalType = '다이어트') {
  const bmi = getBmi(weight, height);
  const bmr = getBMR(weight, height, age);
  const activityLevel = getActivityLevel(goalType, bmi);
  return bmr * activityLevel;
}

// 목표별 권장 칼로리
export function getTargetCalories(
  weight,
  height,
  age = 25,
  goalType = '다이어트'
) {
  const tdee = getTDEE(weight, height, age, goalType);

  if (goalType === '다이어트') return Math.max(1200, tdee - 500);
  if (goalType === '근력향상') return tdee + 300;
  if (goalType === '체력향상') return tdee + 200;
  if (goalType === '체형교정') return tdee;
  return tdee;
}

// =========================
// 1년 전용 체형 예측 (초보자)
// =========================

// 목표별 설정값 (초보자 1년차 기준, 남성)
const GOAL_CONFIGS = {
  다이어트: {
    description: '체중/체지방 감량 집중',
    monthlyWeightLoss: 1.5, // kg/월 (초보자 기준 상한)
    muscleGainRate: 0.15, // kg/월 (다이어트 중 근육 소량 증가 가정)
    targetType: 'weight_loss',
  },
  근력향상: {
    description: '근육량 증가 + 체지방 감소 (리컴포지션)',
    muscleGainRate: 0.6, // 정상 BMI에서 kg/월
    muscleGainRateObese: 0.4, // BMI ≥30 에서도 근육 증가 가능
    fatLossRate: 0.5, // kg/월 (체지방 감소량)
    monthlyWeightLoss: 1.0, // 고도비만에서 체중도 함께 감소
    targetType: 'recomp',
  },
  체력향상: {
    description: '지구력/전반적 체력 향상',
    monthlyWeightLoss: 0.5,
    muscleGainRate: 0.3,
    targetType: 'cardio',
  },
  체형교정: {
    description: '균형잡힌 체형 만들기',
    monthlyWeightLoss: 0.3,
    muscleGainRate: 0.4,
    targetType: 'balance',
  },
};

// 건강한 최소 체지방 (남성 기준: 현실적인 목표선 10%)
function getMinBodyFat(weight) {
  return weight * 0.1; // 10%
}

// FFMI 계산: 제지방량 / 키(m)^2
function getFFMI(weight, bodyFat, height) {
  const heightM = height / 100;
  const leanMass = weight - bodyFat;
  return leanMass / (heightM * heightM);
}

// FFMI 기반 최대 근육량 (초보자 1년 목표 상한: FFMI 21)
function getMaxMuscle(currentWeight, height, bodyFat) {
  const heightM = height / 100;
  const targetFFMI = 21; // 공신력 있는 초보자 상한선
  const currentFat = bodyFat;

  // 목표 제지방량 (lean mass)
  const targetLeanMass = targetFFMI * heightM * heightM;

  // 제지방 중 골격근 비율을 약 50%로 가정
  const maxMuscleFromFFMI = targetLeanMass * 0.5;

  // 너무 낮게 나오지 않도록 안전장치 (현재 체중의 40~48% 사이)
  const minByRatio = currentWeight * 0.4;
  const maxByRatio = currentWeight * 0.48;

  return Math.min(Math.max(maxMuscleFromFFMI, minByRatio), maxByRatio);
}

// 비선형 근육 증가량 (뉴비게인 감쇠)
function getMuscleGainNonLinear(months, baseRate) {
  let totalGain = 0;

  for (let i = 0; i < months; i++) {
    let multiplier;
    if (i < 3) multiplier = 1.0; // 1~3개월: 100%
    else if (i < 6) multiplier = 0.85; // 4~6개월
    else if (i < 9) multiplier = 0.75; // 7~9개월
    else multiplier = 0.65; // 10~12개월

    totalGain += baseRate * multiplier;
  }

  return totalGain;
}

// 체중 감량 시 기타 성분 감소량 (수분, 소량 제지방 등)
function getEtcWeightChange(totalWeightLoss) {
  return totalWeightLoss * 0.12;
}

// 입력값 검증
function validateInputs(weight, height, muscle, bodyFat, months) {
  if (months < 0) {
    throw new Error('예측 기간은 0개월 이상이어야 합니다.');
  }
  if (months > 12) {
    throw new Error('예측 기간은 최대 12개월(1년)까지 가능합니다.');
  }

  const totalBodyComp = muscle + bodyFat;
  if (totalBodyComp > weight * 0.95) {
    throw new Error(
      `체성분 합계(근육 ${muscle}kg + 체지방 ${bodyFat}kg = ${totalBodyComp.toFixed(
        1
      )}kg)가 체중(${weight}kg)의 95%를 초과합니다. 입력값을 확인해주세요.`
    );
  }

  if (weight <= 0 || height <= 0) {
    throw new Error('체중과 키는 0보다 커야 합니다.');
  }

  if (muscle < 0 || bodyFat < 0) {
    throw new Error('근육량과 체지방량은 0 이상이어야 합니다.');
  }

  if (bodyFat < 5) {
    throw new Error('체지방량은 최소 5kg 이상이어야 합니다. (건강 최소값)');
  }

  const bmi = getBmi(weight, height);
  if (bmi < 15 || bmi > 45) {
    throw new Error(
      'BMI가 정상 범위(15~45)를 벗어났습니다. 전문가 상담을 권장합니다.'
    );
  }
}

// =========================
// 메인: 1년 체형 예측
// =========================
export function getBodyPrediction({
  weight,
  height = 170,
  muscle,
  bodyFat,
  months,
  goalType,
}) {
  // 1. 검증
  validateInputs(weight, height, muscle, bodyFat, months);

  // 2. 초기값
  const { min: minWeight, max: maxWeight } = getNormalWeightRange(height);
  const currentBmi = getBmi(weight, height);
  const config = GOAL_CONFIGS[goalType] || GOAL_CONFIGS['다이어트'];

  let newWeight = weight;
  let newMuscle = muscle;
  let newBodyFat = bodyFat;

  // ========== 다이어트 ==========
  if (goalType === '다이어트') {
    const muscleChange = getMuscleGainNonLinear(months, config.muscleGainRate);
    const targetWeightLoss = months * config.monthlyWeightLoss;
    const actualWeightLoss = Math.min(targetWeightLoss, weight - minWeight);
    const etcChange = getEtcWeightChange(actualWeightLoss);
    const fatChange = actualWeightLoss + muscleChange + etcChange;

    newWeight = weight - actualWeightLoss;
    newMuscle = muscle + muscleChange;
    newBodyFat = Math.max(bodyFat - fatChange, getMinBodyFat(newWeight));
  }
  // ========== 근력향상 ==========
  else if (goalType === '근력향상') {
    // 고도비만 (BMI ≥ 30): 체중도 줄이고, 근육도 늘리는 모드
    if (currentBmi >= 30) {
      const targetBMI27Weight = Math.min(maxWeight * 1.17, weight); // BMI ~27 근처
      const monthsToTarget = Math.max(
        0,
        Math.ceil((weight - targetBMI27Weight) / config.monthlyWeightLoss)
      );

      if (months <= monthsToTarget && months <= 12) {
        const muscleChange = getMuscleGainNonLinear(
          months,
          config.muscleGainRateObese
        );
        const actualWeightLoss = Math.min(
          months * config.monthlyWeightLoss,
          weight - targetBMI27Weight
        );
        const etcChange = getEtcWeightChange(actualWeightLoss);
        const fatChange = actualWeightLoss + muscleChange + etcChange;

        newWeight = weight - actualWeightLoss;
        newMuscle = muscle + muscleChange;
        newBodyFat = Math.max(newBodyFat - fatChange, getMinBodyFat(newWeight));
      } else {
        // 감량 후 리컴포지션
        const dietMonths = Math.min(monthsToTarget, 12);
        const muscleAfterDiet =
          muscle +
          getMuscleGainNonLinear(dietMonths, config.muscleGainRateObese);
        const weightLossDiet = weight - targetBMI27Weight;
        const etcChangeDiet = getEtcWeightChange(weightLossDiet);
        const fatLossDiet =
          weightLossDiet + (muscleAfterDiet - muscle) + etcChangeDiet;
        const fatAfterDiet = Math.max(
          bodyFat - fatLossDiet,
          getMinBodyFat(targetBMI27Weight)
        );

        const extraMonths = Math.max(0, months - dietMonths);
        const muscleGainRecomp = getMuscleGainNonLinear(
          extraMonths,
          config.muscleGainRate
        );
        const fatLossRecomp = getMuscleGainNonLinear(
          extraMonths,
          config.fatLossRate
        );

        newWeight = targetBMI27Weight;
        newMuscle = muscleAfterDiet + muscleGainRecomp;
        newBodyFat = Math.max(
          fatAfterDiet - fatLossRecomp,
          getMinBodyFat(newWeight)
        );
      }
    }
    // 과체중~비만 (BMI 23~30): 리컴포지션
    else if (currentBmi >= 23 && currentBmi < 30) {
      const muscleChange = getMuscleGainNonLinear(
        months,
        config.muscleGainRate
      );
      const fatChange = getMuscleGainNonLinear(months, config.fatLossRate);

      newWeight = weight; // 체중 유지
      newMuscle = muscle + muscleChange;
      newBodyFat = Math.max(bodyFat - fatChange, getMinBodyFat(weight));
    }
    // 저체중: 먼저 증량 후 리컴포지션
    else if (currentBmi < 18.5) {
      const monthsToNormal = Math.ceil((minWeight - weight) / 0.8);

      if (months <= monthsToNormal) {
        const muscleChange = getMuscleGainNonLinear(months, 0.5);
        const weightGain = Math.min(months * 0.8, minWeight - weight);
        const fatChange = Math.max(0, weightGain - muscleChange);

        newWeight = weight + weightGain;
        newMuscle = muscle + muscleChange;
        newBodyFat = bodyFat + fatChange;
      } else {
        const gainMonths = monthsToNormal;
        const muscleAfterGain =
          muscle + getMuscleGainNonLinear(gainMonths, 0.5);
        const weightGain = minWeight - weight;
        const fatGain = Math.max(0, weightGain - (muscleAfterGain - muscle));
        const fatAfterGain = bodyFat + fatGain;

        const extraMonths = months - gainMonths;
        const muscleGainRecomp = getMuscleGainNonLinear(
          extraMonths,
          config.muscleGainRate
        );
        const fatLossRecomp = getMuscleGainNonLinear(
          extraMonths,
          config.fatLossRate
        );

        newWeight = minWeight;
        newMuscle = muscleAfterGain + muscleGainRecomp;
        newBodyFat = Math.max(
          fatAfterGain - fatLossRecomp,
          getMinBodyFat(newWeight)
        );
      }
    }
    // 정상 BMI: 바로 리컴포지션
    else {
      const muscleChange = getMuscleGainNonLinear(
        months,
        config.muscleGainRate
      );
      const fatChange = getMuscleGainNonLinear(months, config.fatLossRate);

      newWeight = weight;
      newMuscle = muscle + muscleChange;
      newBodyFat = Math.max(bodyFat - fatChange, getMinBodyFat(weight));
    }
  }
  // ========== 체력향상 ==========
  else if (goalType === '체력향상') {
    const muscleChange = getMuscleGainNonLinear(months, config.muscleGainRate);
    const targetWeightLoss = months * config.monthlyWeightLoss;
    const actualWeightLoss = Math.min(targetWeightLoss, weight - minWeight);
    const etcChange = getEtcWeightChange(actualWeightLoss);
    const fatChange = actualWeightLoss + muscleChange + etcChange;

    newWeight = weight - actualWeightLoss;
    newMuscle = muscle + muscleChange;
    newBodyFat = Math.max(bodyFat - fatChange, getMinBodyFat(newWeight));
  }
  // ========== 체형교정 ==========
  else if (goalType === '체형교정') {
    const muscleChange = getMuscleGainNonLinear(months, config.muscleGainRate);
    const targetWeightLoss = months * config.monthlyWeightLoss;
    const actualWeightLoss = Math.min(targetWeightLoss, weight - minWeight);
    const etcChange = getEtcWeightChange(actualWeightLoss);
    const fatChange = actualWeightLoss + muscleChange + etcChange;

    newWeight = weight - actualWeightLoss;
    newMuscle = muscle + muscleChange;
    newBodyFat = Math.max(bodyFat - fatChange, getMinBodyFat(newWeight));
  }
  // ========== 기본값 ==========
  else {
    const muscleChange = getMuscleGainNonLinear(months, 0.25);
    const targetWeightLoss = months * 1.0;
    const actualWeightLoss = Math.min(targetWeightLoss, weight - minWeight);
    const etcChange = getEtcWeightChange(actualWeightLoss);
    const fatChange = actualWeightLoss + muscleChange + etcChange;

    newWeight = weight - actualWeightLoss;
    newMuscle = muscle + muscleChange;
    newBodyFat = Math.max(bodyFat - fatChange, getMinBodyFat(newWeight));
  }

  // 5. 안전장치: 최소 체지방 / 최대 근육 / 최소 체중
  const minBodyFat = getMinBodyFat(newWeight);
  newBodyFat = Math.max(minBodyFat, newBodyFat);

  const maxMuscle = getMaxMuscle(newWeight, height, newBodyFat);
  newMuscle = Math.min(maxMuscle, newMuscle);

  newWeight = Math.max(minWeight * 0.9, newWeight);

  // 6. 최종 반환
  return {
    weight: Number(newWeight.toFixed(1)),
    muscle: Number(newMuscle.toFixed(1)),
    bodyFat: Number(newBodyFat.toFixed(1)),
  };
}

// 칼로리 정보 요약
export function getCalorieInfo(
  weight,
  height,
  age = 25,
  goalType = '다이어트'
) {
  const bmi = getBmi(weight, height);
  const bmiClass = getBmiClass(bmi);
  const bmr = getBMR(weight, height, age);
  const tdee = getTDEE(weight, height, age, goalType);
  const targetCalories = getTargetCalories(weight, height, age, goalType);
  const activityLevel = getActivityLevel(goalType, bmi);

  return {
    bmi: Number(bmi.toFixed(1)),
    bmiClass,
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    targetCalories: Math.round(targetCalories),
    activityLevel,
    deficit: Math.round(tdee - targetCalories),
  };
}
