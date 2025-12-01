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
  weight: '95kg',
  height: '175cm',
  muscle: '32kg',
  bodyFat: '30%',
};

const numberProfileDetailKeyList = [
  profileDetailKey.weight,
  profileDetailKey.height,
  profileDetailKey.muscle,
  profileDetailKey.bodyFat,
];

/**
 *   프로필 입력 필드 (ProfileInputBox)
 * - 개별 프로필 항목을 입력받는 재사용 가능한 컴포넌트
 * - 항목의 타입(숫자형/문자형)을 판별하여 숫자 필드에는 정규식 유효성 검사를 적용
 */

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
