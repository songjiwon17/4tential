import { useAtomValue } from 'jotai';
import { profileSavedAtom } from '../../store/atoms/ProfileAtoms';
import CurrentStatusCard from './component/MyBodyCurrentStatusCard';
import MyBodyPredictedChanges from './component/MyBodyPredictedChanges';

const MyBodyContentsBox = () => {
  const profileData = useAtomValue(profileSavedAtom);

  return (
    <>
      {/* 현재 상태 섹션 */}
      <CurrentStatusCard
        userName={profileData.name || '사용자'}
        goalType={profileData.type || '다이어트'}
        height={parseFloat(profileData.height) || 158}
        weight={parseFloat(profileData.weight) || 60}
        muscle={parseFloat(profileData.muscle) || 21}
        bodyFat={parseFloat(profileData.bodyFat) || 28}
      />

      {/* 예측 변화 섹션 */}
      <MyBodyPredictedChanges />
    </>
  );
};

export default MyBodyContentsBox;
