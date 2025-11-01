import MainTitle from '../../components/MainTitle';
import SubText from '../../components/SubText';
import { Box, Flex } from '@chakra-ui/react';

const Profile = () => {
  return (
    <Flex direction={'column'} justifyContent={'center'} alignItems={'center'}>
      <MainTitle mainTitle={'프로필'} />
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

      <Box width={'954px'} height={'700px'}></Box>
    </Flex>
  );
};

export default Profile;
