import { Button, chakra } from '@chakra-ui/react';

const SaveBtn = chakra(Button, {
  baseStyle: {
    width: '100%',
    maxWidth: '600px',
    height: '30px',
    borderRadius: '50px',
    marginTop: '40px',
    backgroundColor: '#C7C7C7',
    color: '#000',
    alignSelf: 'center',
    fontSize: ['14px', '16px', '18px'],
  },
});

const ProfileSaveBtn = ({ value = '', onClick }) => {
  return <SaveBtn onClick={onClick}>{value}</SaveBtn>;
};

export default ProfileSaveBtn;
