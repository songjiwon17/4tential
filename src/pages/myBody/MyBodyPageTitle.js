import MainTitle from '../../components/MainTitle';
import SubText from '../../components/SubText';

const MyBodyPageTitle = () => {
  return (
    <>
      <MainTitle mainTitle={'나의 체형'} mt={10} />
      <SubText
        subText={
          <>
            지금부터 입력한 신체정보를 기반으로 운동 능력과 체형을 시각적으로
            분석해요
            <br />
            지금의 당신을 정확히 알고 더 나은 변화를 설계해보세요!
          </>
        }
      />
    </>
  );
};

export default MyBodyPageTitle;
