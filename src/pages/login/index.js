import {
  Box,
  chakra,
  Center,
  Text,
  Flex,
  Input,
  Button,
} from '@chakra-ui/react';

const LoginBox = chakra(Box, {
  baseStyle: {
    width: '700px',
    height: 'auto',
    padding: '40px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '30px',
    backgroundColor: '#fff',
    boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
  },
});

const InputBox = chakra(Input, {
  baseStyle: {
    width: '100%',
    height: '40px',
    border: '1px solid #7D7D7D',
    backgroundColor: 'transparent',
    borderRadius: '5px',
    color: '#000',
    _placeholder: { color: '#7D7D7D', fontSize: '14px' },
  },
});

const LoginBtn = chakra(Button, {
  baseStyle: {
    width: '100%',
    height: '40px',
    border: '1px solid #7D7D7D',
    backgroundColor: 'transparent',
    borderRadius: '5px',
    color: '#7D7D7D',
    _hover: {
      backgroundColor: 'transparent',
    },
  },
});

const Login = () => {
  return (
    <Center width={'100%'} h={'100%'} pt={'10px'} mb={'20px'}>
      <LoginBox>
        <Text color={'#000'} fontWeight={'bold'} mb={'4px'}>
          로그인
        </Text>
        <Text variant={'loginInfonText'}>
          지금 로그인해서 신체정보를 등록해보세요! <br />
          매일 접속하면 운동 열정을 끌어올리는 동기부여를 드립니다.
        </Text>

        <Flex
          width={'100%'}
          direction={'column'}
          alignItems={'flex-start'}
          padding={'30px'}
          gap={2.5}
        >
          <Box width={'20px'} height={'2px'} backgroundColor={'#3C3C3C'}></Box>
          <Text fontSize={'18px'} color={'#7D7D7D'}>
            아이디
          </Text>
          <InputBox
            placeholder={'신체정보 등록에 사용할 아이디를 입력하세요.'}
          />

          <Text fontSize={'18px'} color={'#7D7D7D'}>
            비밀번호
          </Text>
          <InputBox placeholder={'비밀번호를 입력하세요.'} />

          <Flex direction={'column'} width={'100%'} gap={2} mt={'20px'}>
            <LoginBtn>로그인없이 이용하기</LoginBtn>
            <LoginBtn
              backgroundColor={'#191919'}
              color={'#fff'}
              _hover={{
                backgroundColor: '#333',
              }}
            >
              로그인
            </LoginBtn>
          </Flex>
        </Flex>
      </LoginBox>
    </Center>
  );
};
export default Login;
