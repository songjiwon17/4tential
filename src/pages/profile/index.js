import ProfileTitle from './ProfileTitle';
import ProfileContentsBox from './ProfileContentsBox';
import { Flex } from '@chakra-ui/react';

const Profile = () => {
  return (
    <Flex direction={'column'} justifyContent={'center'} alignItems={'center'}>
      <ProfileTitle />
      <ProfileContentsBox />
    </Flex>
  );
};

export default Profile;
