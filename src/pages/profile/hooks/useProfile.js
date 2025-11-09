import { useAtom, useAtomValue } from 'jotai';
import {
  profileTypeAtom,
  profileDetailKeyAtom,
  profileSavedAtom,
} from '../../../store/atoms';

const useProfile = () => {
  const profileType = useAtomValue(profileTypeAtom);
  const profileDetail = useAtomValue(profileDetailKeyAtom);
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
