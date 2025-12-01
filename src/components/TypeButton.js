import { Button, chakra } from '@chakra-ui/react';
/**
 * [공용 컴포넌트] 운동 목적 선택 버튼
 * - 사용자가 4가지 운동 목적(다이어트, 체력향상, 근력향상, 체형교정) 중 하나를 선택할 때 사용
 * - 선택된 상태(isSelected)에 따라 배경색과 글자색이 반전되어, 현재 선택된 항목을 시각적으로 강조
 */
const TypeBtn = chakra(Button, {
  baseStyle: {
    variant: 'unstyled',
    width: '100px',
    height: '30px',
    border: '1px solid #fff',
    backgroundColor: 'transparent',
    borderRadius: '50px',
    color: '#fff',
    fontWeight: 'normal',
    _hover: {
      backgroundColor: '##EAEAEA',
      color: '#050202',
    },
    transition:
      'background-color 0.3s ease, color 0.3s ease, transform 0.2s ease',
  },
});

const TypeButton = ({
  value = '',
  isSelected = false,
  onChange = () => {},
}) => {
  return (
    <TypeBtn
      bg={isSelected ? '#EAEAEA' : 'transparent'}
      color={isSelected ? '#050202' : '#fff'}
      onClick={() => onChange(value)}
    >
      {value}
    </TypeBtn>
  );
};

export default TypeButton;
