import { useAtom } from 'jotai';
import { profileTypeAtom, profileDetailTypeAtom } from '../../../store/atoms';

const useProfile = () => {
  const [profileType, setProfileType] = useAtom(profileTypeAtom);
  const [profileDetail, setProfileDetail] = useAtom(profileDetailTypeAtom);

  const handleChangeProfileType = (value) => {
    setProfileType(value);
  };

  const handleDetailChange = (key, newValue) => {
    setProfileDetail((prev) => ({
      ...prev,
      [key]: newValue,
    }));
  };

  return {
    profileType,
    profileDetail,
    handleChangeProfileType,
    handleDetailChange,
  };
};

export default useProfile;
