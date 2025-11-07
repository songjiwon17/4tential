import MainTitle from '../../components/MainTitle';
import SubText from '../../components/SubText';
import { Flex, Box } from '@chakra-ui/react';
import MyBodyContentsBox from './MyBodyContentsBox';

const MyBody = () => {
  return (
    <Flex direction={'column'} justifyContent={'center'} alignItems={'center'}>
      <MainTitle mainTitle={'나의 체형'} mt={10} />
      <SubText
        subText={
          <>
            자발적인 입력란, 신체정보로 기반으로 운동 능력과 체형을 시각적으로
            분석한 결과에요
            <br />
            예시 자료일 뿐이니 걱정하지 마세요!
          </>
        }
      />
      <Box pt={'45px'}>
        <MyBodyContentsBox />
      </Box>
    </Flex>
  );
};

export default MyBody;
