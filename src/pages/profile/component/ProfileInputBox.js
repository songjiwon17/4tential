import { profileDetailKey } from '../../../store/atoms';
import { Input, chakra } from '@chakra-ui/react';

const InputBox = chakra(Input, {
  baseStyle: {
    width: '650px',
    height: '35px',
    border: '1px solid #fff',
    backgroundColor: 'transparent',
    borderRadius: '50px',
    color: '#fff',
    _placeholder: {
      color: 'rgba(255,255,255,0.5)',
    },
  },
});

const placeholderProfileEx = {
  weight: '50kg',
  height: '158cm',
  muscle: '21kg',
  bodyFat: '28%',
};

const numberProfileDetailKeyList = [
  profileDetailKey.weight,
  profileDetailKey.height,
  profileDetailKey.muscle,
  profileDetailKey.bodyFat,
];

const ProfileInputBox = ({ detailKey, value, onChange }) => {
  const isNumber = numberProfileDetailKeyList.includes(
    profileDetailKey[detailKey]
  );

  const placeholder = isNumber ? `ex: ${placeholderProfileEx[detailKey]}` : '';

  const handleChangeUnitProfileDetailKey = (e) => {
    let input = e.target.value;

    if (isNumber) {
      input = input.replace(/[^0-9.]/g, '');
      input = input === '' ? '' : parseFloat(input);
    }

    onChange(detailKey, input);
  };

  return (
    <InputBox
      type={isNumber ? 'number' : 'text'}
      value={value}
      placeholder={placeholder}
      onChange={handleChangeUnitProfileDetailKey}
    />
  );
};

export default ProfileInputBox;
