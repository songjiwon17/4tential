import { Input, chakra } from '@chakra-ui/react';

const InputBox = chakra(Input, {
  baseStyle: {
    width: '650px',
    height: '35px',
    border: '1px solid #fff',
    backgroundColor: 'transparent',
    borderRadius: '50px',
    color: '#fff',
  },
});

const ProfileInputBox = ({ detailKey, value, onChange }) => {
  return (
    <InputBox
      value={value}
      onChange={(e) => onChange(detailKey, e.target.value)}
    />
  );
};

export default ProfileInputBox;
