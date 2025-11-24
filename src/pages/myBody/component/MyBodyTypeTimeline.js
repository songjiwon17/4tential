import { Box, Text, Center } from '@chakra-ui/react';
import MyBodyTitle from './MyBodyTitle';

const MyBodyTypeTimeline = () => {
  return (
    <>
      <MyBodyTitle width={'100%'}>3개월 주기 나의 체형</MyBodyTitle>

      <Center
        bgGradient={'linear(to-br, #E5E5E5, #D0D0D0)'}
        borderRadius={'12px'}
        h={'400px'}
        position={'relative'}
        overflow={'hidden'}
        boxShadow={'inset 0 2px 8px rgba(0, 0, 0, 0.1)'}
        width={'100%'}
      >
        <Box
          position={'absolute'}
          width={'100%'}
          height={'100%'}
          bgGradient={
            'radial(circle at 30% 30%, rgba(255, 107, 107, 0.1), transparent)'
          }
        />
        <Text
          color={'#999'}
          fontSize={'md'}
          fontWeight={'medium'}
          position={'relative'}
          zIndex={1}
        >
          추후 결과 예정
        </Text>
      </Center>
    </>
  );
};

export default MyBodyTypeTimeline;
