import useLogin from './hooks/useLogin';
import { InputBox, LoginBox, LoginBtn } from './component/LoginStyle';
import { Box, Center, Text, Flex } from '@chakra-ui/react';

const Login = () => {
  const { loginInput, setLoginInput, handleChangeLogin, handleChangeMoveMain } =
    useLogin();

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
          <Text variant={'loginInfonText'} color={'#7D7D7D'}>
            아이디
          </Text>
          <InputBox
            value={loginInput.id}
            onChange={(e) =>
              setLoginInput((prev) => ({ ...prev, id: e.target.value }))
            }
            placeholder={'신체정보 등록에 사용할 아이디를 입력하세요.'}
          />

          <Text variant={'loginInfonText'} color={'#7D7D7D'}>
            비밀번호
          </Text>
          <InputBox
            type="password"
            value={loginInput.password}
            onChange={(e) =>
              setLoginInput((prev) => ({ ...prev, password: e.target.value }))
            }
            placeholder={'비밀번호를 입력하세요.'}
          />

          <Flex direction={'column'} width={'100%'} gap={2} mt={'20px'}>
            <LoginBtn onClick={handleChangeMoveMain}>
              로그인없이 이용하기
            </LoginBtn>
            <LoginBtn
              backgroundColor={'#191919'}
              color={'#fff'}
              _hover={{
                backgroundColor: '#333',
              }}
              onClick={() => handleChangeLogin(loginInput)}
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
