import ProfileTitle from './ProfileTitle';
import ProfileContentsBox from './ProfileContentsBox';
import { Flex } from '@chakra-ui/react';

const Profile = ({ onSave }) => {
  return (
    <Flex direction={'column'} justifyContent={'center'} alignItems={'center'}>
      <ProfileTitle />
      <ProfileContentsBox onSave={onSave} />
    </Flex>
  );
};

export default Profile;
