import { Button, chakra } from '@chakra-ui/react';

/**
 * =====================================================================
 * 커스텀 추천 검색어 버튼 스타일
 * =====================================================================
 *
 * Chakra UI의 factory 함수를 사용하여 기본 Button에 공통 스타일을 미리 정의함.
 * - hover 효과와 부드러운 전환(transition) 애니메이션 포함
 *
 */

const StyledFoodRecomendationBtn = chakra(Button, {
  baseStyle: {
    variant: 'unstyled', // 기본 버튼 스타일 제거.
    width: 'auto',
    borderRadius: '50px', // 둥근 캡슐 모양.
    fontWeight: 'normal',
    _hover: {
      backgroundColor: '#EAEAEA',
      color: '#050202',
    },
    // 색상 변화가 부드럽게 이어지도록 트랜지션 설정.
    transition:
      'background-color 0.3s ease, color 0.3s ease, transform 0.2s ease',
  },
});

const FoodRecomendationBtn = ({ value = '', onClick, isSelected = false }) => {
  return (
    <StyledFoodRecomendationBtn
      // onClick && onClick(value) 은 onClick 함수가 실제로 전달되었을 때만 실행.
      onClick={() => onClick && onClick(value)}
      // 화면 너비에 따른 반응형 사이즈 및 여백 설정.
      h={{ base: '30px', md: '40px' }}
      px={{ base: '12px', md: '20px' }}
      fontSize={{ base: '13px', md: '16px' }}
      // isSelected 상태(True/False)에 따라 디자인 변경.
      bg={isSelected ? '#EAEAEA' : 'transparent'}
      color={isSelected ? '#050202' : '#fff'}
      border={isSelected ? '1px solid #EAEAEA' : '1px solid #fff'}
    >
      {value}
    </StyledFoodRecomendationBtn>
  );
};

export default FoodRecomendationBtn;
