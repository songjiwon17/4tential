import ContentsBox from '../../components/ContentsBox';
import Line from '../../components/Line';
import MainTitle from '../../components/MainTitle';
import TypeButton from '../../components/TypeButton';
import ProfileInputBox from './component/ProfileInputBox';
import { Flex, HStack, Text, VStack } from '@chakra-ui/react';

const ProfileContentsBox = () => {
  return (
    <ContentsBox>
      <Line />
      <MainTitle
        mainTitle={'회원님의 정보를 입력해주세요.'}
        fontWeight={'normal'}
      />

      <Text variant="profileInputText" mt={30} alignSelf="center">
        운동 목적
      </Text>

      <Flex mt={30} gap={6} alignSelf="center">
        <TypeButton value={'다이어트'} />
        <TypeButton value={'체력향상'} />
        <TypeButton value={'근력향상'} />
        <TypeButton value={'체형교정'} />
      </Flex>

      <VStack spacing={10} mt={12} alignSelf="center">
        {['이름', '체중', '키', '근육량', '체지방량'].map((label, index) => (
          <HStack
            key={index}
            spacing={6}
            w={['90%', '80%', '80%']}
            justify="space-between"
          >
            <Text
              variant="profileInputText"
              flex="1"
              whiteSpace="nowrap"
              minW="80px"
            >
              {label}
            </Text>
            <ProfileInputBox flex="2" />
          </HStack>
        ))}
      </VStack>
    </ContentsBox>
  );
};
export default ProfileContentsBox;
