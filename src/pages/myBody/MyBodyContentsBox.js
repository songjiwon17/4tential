import { useAtomValue } from 'jotai';
import { useState } from 'react';
import { profileSavedAtom } from '../../store/atoms/ProfileAtoms';

import {
  getBmi,
  getBmiClass,
  getFatPercent,
  getBodyPrediction,
} from './utils/bodyCalc';
import BodyShapePreview from './component/BodyShapePreview';

const MONTHS = [0, 3, 6, 12];
const LABELS = ['현재', '3개월 후', '6개월 후', '1년 후'];

function MyBodyContentsBox() {
  const [slider, setSlider] = useState(0);
  const profile = useAtomValue(profileSavedAtom);

  // 현재 값
  const weight = Number(profile.weight) || 70;
  const height = Number(profile.height) || 170;
  const muscle = Number(profile.muscle) || 25;
  const bodyFat = Number(profile.bodyFat) || 15;
  const goalType = profile.type || '다이어트'; // ✅ 수정: goalType → type

  // 슬라이더에 따라 시점별 값
  const {
    weight: w,
    muscle: m,
    bodyFat: f,
  } = slider === 0
    ? { weight, muscle, bodyFat }
    : getBodyPrediction({
        weight,
        height, // ✅ 추가: 정상체중 계산용
        muscle,
        bodyFat,
        months: MONTHS[slider],
        goalType,
      });

  // BMI·등급 등 표시
  const bmi = getBmi(w, height);
  const bmiClass = getBmiClass(bmi);
  const fatPercent = getFatPercent(w, f);

  return (
    <section style={{ width: '100%', padding: 24 }}>
      <h2 style={{ color: '#fff', fontSize: 28 }}>나의 체형</h2>
      <div
        style={{
          color: '#FF6B6B',
          fontWeight: 'bold',
          fontSize: 20,
          marginBottom: 8,
        }}
      >
        {LABELS[slider]}
      </div>
      <input
        type="range"
        min={0}
        max={3}
        value={slider}
        step={1}
        onChange={(e) => setSlider(Number(e.target.value))}
        style={{ width: '100%', marginBottom: 12 }}
      />
      <BodyShapePreview
        weight={w}
        height={height}
        muscle={m}
        bodyFat={f}
        goalType={goalType} // ✅ 추가
        isCurrentState={slider === 0}
      />
    </section>
  );
}

export default MyBodyContentsBox;
