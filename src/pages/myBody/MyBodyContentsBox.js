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
        height={parseFloat(profileData.height) || 170}
        weight={parseFloat(profileData.weight) || 70}
        muscle={parseFloat(profileData.muscle) || 25}
        bodyFat={parseFloat(profileData.bodyFat) || 20}
      />

      {/* 예측 변화 섹션 */}
      <MyBodyPredictedChanges />
    </>
  );
};

export default MyBodyContentsBox;
