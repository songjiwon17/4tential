import { Button, chakra } from '@chakra-ui/react';

const StyledFoodRecomendationBtn = chakra(Button, {
  baseStyle: {
    variant: 'unstyled',
    width: 'auto',
    borderRadius: '50px',
    fontWeight: 'normal',
    _hover: {
      backgroundColor: '#EAEAEA',
      color: '#050202',
    },
    transition:
      'background-color 0.3s ease, color 0.3s ease, transform 0.2s ease',
  },
});

const FoodRecomendationBtn = ({ value = '', onClick, isSelected = false }) => {
  return (
    <StyledFoodRecomendationBtn
      onClick={() => onClick && onClick(value)}
      h={{ base: '30px', md: '40px' }}
      px={{ base: '12px', md: '20px' }}
      fontSize={{ base: '13px', md: '16px' }}
      bg={isSelected ? '#EAEAEA' : 'transparent'}
      color={isSelected ? '#050202' : '#fff'}
      border={isSelected ? '1px solid #EAEAEA' : '1px solid #fff'}
    >
      {value}
    </StyledFoodRecomendationBtn>
  );
};

export default FoodRecomendationBtn;
