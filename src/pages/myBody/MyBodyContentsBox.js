import ContentsBox from '../../components/ContentsBox';
import MainTitle from '../../components/MainTitle';
import CurrentStatus from './component/CurrentStatus';
import PredictedChanges from './component/PredictedChanges';
import BodyTypeTimeline from './component/BodyTypeTimeline';
import { Box, VStack, Text } from '@chakra-ui/react';

const MyBodyContentsBox = () => {
  return (
    <ContentsBox height={'auto'} minHeight={'700px'}>
      {/* Line 대신 직접 Box 사용 - 끝까지 가도록 */}
      <Box
        width={'100%'}
        height={'2px'}
        marginTop={'8px'}
        backgroundColor={'#ffffff'}
        mb={6}
      />

      <MainTitle mainTitle={'나의 체형 분석'} fontWeight={'normal'} />

      {/* 1. 현재 상태 및 체형 정보 */}
      <VStack spacing={0} mt={12} width={'100%'} align={'stretch'}>
        <CurrentStatus />
      </VStack>

      {/* 2. 미리보는 나의 변화 */}
      <VStack spacing={0} mt={16} width={'100%'} align={'stretch'}>
        <PredictedChanges />
      </VStack>

      {/* 3. 3개월 주기 나의 체형 */}
      <VStack spacing={0} mt={16} width={'100%'} align={'stretch'}>
        <BodyTypeTimeline />
      </VStack>

      {/* 하단 안내 문구 */}
      <Text
        textAlign={'center'}
        color={'#888'}
        fontSize={'sm'}
        fontWeight={'medium'}
        transition={'all 0.3s ease'}
        mt={12}
        _hover={{
          color: '#FFF',
        }}
      >
        슬라이더를 이동해서 실시간으로 체형 변화를 확인해보세요.
      </Text>
    </ContentsBox>
  );
};

export default MyBodyContentsBox;
