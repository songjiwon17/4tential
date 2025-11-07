import MainTitle from '../../components/MainTitle';
import SubText from '../../components/SubText';

const ProfileTitle = () => {
  return (
    <>
      <MainTitle mainTitle={'프로필'} mt={10} />
      <SubText
        subText={
          <>
            나의 신체정보를 입력하면 체형과 그에 맞는 운동, 식단을 추천받을 수
            있어요!
            <br />
            나의 프로필을 완성해볼까요?
          </>
        }
      />
    </>
  );
};

export default ProfileTitle;
