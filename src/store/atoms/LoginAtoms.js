import { atom } from 'jotai';
import { ProfileTypes } from './ProfileAtoms';

/**
 * [Mock Data] 테스트용 로그인 계정 정보
 * - 시연 영상 촬영이나 테스트를 위해 미리 정의해둔 고정 계정
 * - 아이디: '4tential', 비밀번호: '1111' 입력 시 로그인이 성공하도록 설정할 때 사용
 */
export const exLoginAtom = atom({
  id: '4tential',
  password: '1111',
});

/**
 * [State] 로그인 입력 폼 상태
 * - 로그인 페이지에서 사용자가 입력하는 아이디와 비밀번호를 실시간으로 저장
 */
export const loginInputAtom = atom({
  id: '',
  password: '',
});

/**
 * [State] 로그인 성공 여부
 */
export const isLoginAtom = atom(false);

/**
 * [Mock Data] 시연용 사용자 프로필
 * - 테스트 계정으로 로그인했을 때, 빈 프로필 대신 보여줄 완성된 예시 데이터
 */
export const exProfileAtom = atom({
  type: ProfileTypes.IncreasedStrength,
  name: '김운동',
  weight: '80',
  height: '175',
  muscle: '30',
  bodyFat: '28',
});
