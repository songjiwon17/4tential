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
  profileDetailLabelKey,
} from '../../store/atoms';
import { Flex, HStack, Text, VStack } from '@chakra-ui/react';

const ProfileContentsBox = () => {
  const {
    profileType,
    profileDetail,
    handleChangeProfileType,
    handleDetailChange,
  } = useProfile();

  const isSelected = (type) => profileType === type;

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
      <Flex mt={30} gap={6} alignSelf="center">
        <TypeButton
          value={ProfileTypes.Diet}
          isSelected={isSelected(ProfileTypes.Diet)}
          onChange={handleChangeProfileType}
        />
        <TypeButton
          value={ProfileTypes.BoostPhysical}
          isSelected={isSelected(ProfileTypes.BoostPhysical)}
          onChange={handleChangeProfileType}
        />
        <TypeButton
          value={ProfileTypes.IncreasedStrength}
          isSelected={isSelected(ProfileTypes.IncreasedStrength)}
          onChange={handleChangeProfileType}
        />
        <TypeButton
          value={ProfileTypes.BodyShapeCorrection}
          isSelected={isSelected(ProfileTypes.BodyShapeCorrection)}
          onChange={handleChangeProfileType}
        />
      </Flex>

      {/* 프로필 정보 입력 */}
      <VStack spacing={10} mt={12} alignSelf="center">
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
              {profileDetailLabelKey[key] || key}
            </Text>
            <ProfileInputBox
              flex="2"
              type={key}
              value={profileDetail[key]}
              onChange={handleDetailChange}
            />
          </HStack>
        ))}
      </VStack>

      <ProfileSaveBtn value={'저장하기'} />
    </ContentsBox>
  );
};
export default ProfileContentsBox;
