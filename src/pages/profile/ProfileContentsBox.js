import ContentsBox from '../../components/ContentsBox';
import Line from '../../components/Line';
import MainTitle from '../../components/MainTitle';
import TypeButton from '../../components/TypeButton';
import ProfileInputBox from './component/ProfileInputBox';
import ProfileSaveBtn from './component/ProfileSaveBtn';
import useProfile from './hooks/useProfile';
import {
  ProfileDetailTypes,
  ProfileTypes,
  profileDetailKey,
} from '../../store/atoms';
import { Flex, HStack, Text, VStack } from '@chakra-ui/react';

/**
 * ============================================
 * 프로필 페이지 - 메인 콘텐츠 박스
 * ============================================
 * - 사용자로부터 운동 목적과 상세 신체 정보(이름, 키, 몸무게 등)를 입력받는 컴포넌트
 * - 운동 목적 선택 버튼들과 신체 정보 입력 필드들을 포함하며, 입력된 데이터를 관리하고 저장하는 역할을 수행
 */

const ProfileContentsBox = ({ onSave }) => {
  // 프로필 관련 비즈니스 로직(상태 관리, 핸들러)을 커스텀 훅에서 가져옴
  const { profileSave, handleChangeProfileType, handleChangeDetails } =
    useProfile();

  const isSelected = (type) => profileSave.type === type;

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

      {/*  운동 목적 4가지 버튼 */}
      <Flex mt={30} gap={6} alignSelf="center" flexWrap="wrap">
        {Object.values(ProfileTypes).map((type) => (
          <TypeButton
            key={type}
            value={type}
            isSelected={isSelected(type)}
            onChange={() => handleChangeProfileType(type)}
          />
        ))}
      </Flex>

      {/* 프로필 정보 입력 */}
      <VStack spacing={10} mt={12} width="100%" maxW="730px" alignSelf="center">
        {Object.keys(ProfileDetailTypes).map((key) => (
          <HStack
            key={key}
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
              {profileDetailKey[key] || key}
            </Text>
            <ProfileInputBox
              flex="2"
              detailKey={key}
              value={profileSave[key]}
              onChange={handleChangeDetails}
            />
          </HStack>
        ))}
      </VStack>

      {/*  저장하기 버튼을 누르면 운동 목적과 프로필 정보가 콘솔에 찍히도록 구현*/}
      <ProfileSaveBtn
        value={'저장하기'}
        onClick={() => {
          onSave(profileSave);
        }}
      />
    </ContentsBox>
  );
};
export default ProfileContentsBox;
