import { atom } from 'jotai';

/**
 *   운동 목적 타입 정의
 * - 사용자가 선택할 수 있는 4가지 운동 목표를 상수로 관리
 * - 오타 방지 및 유지보수 편의성을 위해 객체로 정의
 */
export const ProfileTypes = {
  Diet: '다이어트',
  BoostPhysical: '체력향상',
  IncreasedStrength: '근력향상',
  BodyShapeCorrection: '체형교정',
};

/**
 * [State] 선택된 운동 목적 상태
 * - 현재 사용자가 선택한 운동 목적을 저장 (기본값: 다이어트)
 */
export const profileTypeAtom = atom(ProfileTypes.Diet);

/**
 *   프로필 상세 정보 초기값
 * - 입력 폼의 초기 상태를 정의
 */
export const ProfileDetailTypes = {
  name: '',
  weight: '',
  height: '',
  muscle: '',
  bodyFat: '',
};

/**
 *   프로필 입력 필드 라벨 매핑
 * - UI에서 각 입력 필드 옆에 표시될 한글 라벨
 */
export const profileDetailKey = {
  name: '이름',
  weight: '체중',
  height: '키',
  muscle: '근육량',
  bodyFat: '체지방률',
};

/**
 * [State] 프로필 입력 폼 상태 (Input Value)
 * - 사용자가 프로필 설정 페이지에서 입력하는 값들을 실시간으로 관리하는 atom
 */
export const profileDetailKeyAtom = atom({
  name: '',
  weight: '',
  height: '',
  muscle: '',
  bodyFat: '',
});

/**
 * [State] 저장된 최종 프로필 정보 (Saved Profile)
 * - 사용자가 '저장하기'를 눌렀을 때 확정된 프로필 데이터
 * - 각 페이지 전반에서 이 데이터를 참조하여 맞춤형 콘텐츠를 제공
 */
export const profileSavedAtom = atom({
  type: ProfileTypes.Diet,
  ...ProfileDetailTypes,
});
