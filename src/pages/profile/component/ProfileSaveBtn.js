import { Button, chakra } from '@chakra-ui/react';

const SaveBtn = chakra(Button, {
  baseStyle: {
    width: '600px',
    height: '30px',
    borderRadius: '50px',
    marginTop: '40px',
    backgroundColor: '#C7C7C7',
    color: '#000',
    alignSelf: 'center',
  },
});

const ProfileSaveBtn = ({ value = '' }) => {
  return <SaveBtn>{value}</SaveBtn>;
};

export default ProfileSaveBtn;
