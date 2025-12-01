import { useAtom, useAtomValue } from 'jotai';
import {
  profileTypeAtom,
  profileDetailKeyAtom,
  profileSavedAtom,
} from '../../../store/atoms';

const useProfile = () => {
  // 운동 목적 타입 (읽기 전용)
  const profileType = useAtomValue(profileTypeAtom);
  // 프로필 상세 key 정보 (읽기 전용)
  const profileDetail = useAtomValue(profileDetailKeyAtom);
  // 실제 저장될 프로필 데이터 (읽기 및 수정 가능) useAtom을 사용하여 상태값과 업데이트 함수를 모두 가져옴
  // 사용자가 입력한 데이터는 이 atom에 실시간으로 반영됨
  const [profileSave, setProfileSave] = useAtom(profileSavedAtom);

  // 운동 목적 변경 시 이벤트 처리
  const handleChangeProfileType = (type) => {
    setProfileSave((prev) => ({ ...prev, type }));
  };

  // 프로필 정보 변경 시 이벤트 처리
  const handleChangeDetails = (key, newValue) => {
    setProfileSave((prev) => ({ ...prev, [key]: newValue }));
  };

  return {
    profileType,
    profileDetail,
    profileSave,
    handleChangeProfileType,
    handleChangeDetails,
  };
};

export default useProfile;
