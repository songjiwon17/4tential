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

// 기초대사량(BMR) 계산 - 미플린-세인트 제어르 공식
// 남성: (10 × 체중) + (6.25 × 키) - (5 × 나이) + 5
// 여성: (10 × 체중) + (6.25 × 키) - (5 × 나이) - 161
export function getBMR(weight, height, age = 25, isMale = true) {
  if (!weight || !height) return 0;
  const base = 10 * weight + 6.25 * height - 5 * age;
  return isMale ? base + 5 : base - 161;
}

// 일일 총 에너지 소비량(TDEE) 계산
export function getTDEE(
  weight,
  height,
  age = 25,
  isMale = true,
  goalType = '다이어트'
) {
  const bmi = getBmi(weight, height);
  const bmr = getBMR(weight, height, age, isMale);
  const activityLevel = getActivityLevel(goalType, bmi);
  return bmr * activityLevel;
}

// 목표별 권장 칼로리 계산
export function getTargetCalories(
  weight,
  height,
  age = 25,
  isMale = true,
  goalType = '다이어트'
) {
  const tdee = getTDEE(weight, height, age, isMale, goalType);

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
// 목표/기간별 체형 예측 공식
export function getBodyPrediction({
  weight,
  height = 170,
  muscle,
  bodyFat,
  months,
  goalType,
}) {
  let w = weight,
    m = muscle,
    f = bodyFat;

  const { min: minWeight, max: maxWeight } = getNormalWeightRange(height);
  const currentBmi = getBmi(weight, height);

  // 다이어트 (정상체중 이하로 안 내려감)
  if (goalType === '다이어트') {
    const targetWeight = weight - months * 1.5;
    w = Math.max(minWeight, targetWeight);
    m += months * 0.3;
    f = Math.max(8, bodyFat - months * 1.2);
  }
  // 근력향상 - 체중 정상화 후 근육 증가
  else if (goalType === '근력향상') {
    if (currentBmi >= 23) {
      // 과체중/비만: 정상체중까지 다이어트 공식
      const monthsToNormal = Math.ceil((weight - maxWeight) / 1.5);

      if (months <= monthsToNormal) {
        // 정상체중 도달 전: 다이어트 공식
        w = Math.max(maxWeight, weight - months * 1.5);
        m += months * 0.3;
        f = Math.max(8, bodyFat - months * 1.2);
      } else {
        // ✅ 정상체중 도달 후: 체중 유지, 근육↑ 체지방↓
        const extraMonths = months - monthsToNormal;

        // 1단계: 다이어트로 정상체중까지
        const muscleAfterDiet = muscle + monthsToNormal * 0.3;
        const fatAfterDiet = Math.max(8, bodyFat - monthsToNormal * 1.2);

        // 2단계: 체중 유지, 근육↑ 체지방↓ (리컴포지션)
        w = maxWeight; // 체중 유지
        m = muscleAfterDiet + extraMonths * 0.7; // 월 0.7kg 근육 증가
        f = Math.max(5, fatAfterDiet - extraMonths * 0.7); // 월 0.7kg 체지방 감소
      }
    } else if (currentBmi < 18.5) {
      // 저체중: 체중 + 근육 동시 증가 → 정상 후 유지
      const monthsToNormal = Math.ceil((minWeight - weight) / 0.8);

      if (months <= monthsToNormal) {
        // 정상체중 도달 전: 체중 + 근육 증가
        w = Math.min(minWeight, weight + months * 0.8);
        m += months * 0.5;
        f += months * 0.2;
      } else {
        // ✅ 정상체중 도달 후: 체중 유지, 근육↑ 체지방↓
        const extraMonths = months - monthsToNormal;

        const muscleAfterGain = muscle + monthsToNormal * 0.5;
        const fatAfterGain = bodyFat + monthsToNormal * 0.2;

        w = minWeight; // 체중 유지
        m = muscleAfterGain + extraMonths * 0.7;
        f = Math.max(5, fatAfterGain - extraMonths * 0.5);
      }
    } else {
      // ✅ 이미 정상체중: 체중 유지, 근육↑ 체지방↓
      w = weight; // 체중 유지
      m += months * 0.7;
      f = Math.max(5, bodyFat - months * 0.7);
    }
  }
  // 체력향상
  else if (goalType === '체력향상') {
    const targetWeight = weight - months * 0.3;
    w = Math.max(minWeight, targetWeight);
    m += months * 0.4;
    f = Math.max(8, bodyFat - months * 0.5);
  }
  // 체형교정
  else if (goalType === '체형교정') {
    const targetWeight = weight - months * 0.2;
    w = Math.max(minWeight, targetWeight);
    m += months * 0.5;
    f = Math.max(8, bodyFat - months * 0.4);
  }
  // 기본값
  else {
    const targetWeight = weight - months * 1.0;
    w = Math.max(minWeight, targetWeight);
    m += months * 0.3;
    f = Math.max(8, bodyFat - months * 0.8);
  }

  return {
    weight: Number(w.toFixed(1)),
    muscle: Number(m.toFixed(1)),
    bodyFat: Number(f.toFixed(1)),
  };
}
