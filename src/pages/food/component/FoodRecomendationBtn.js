import { Button, chakra } from '@chakra-ui/react';

const StyledFoodRecomendationBtn = chakra(Button, {
  baseStyle: {
    variant: 'unstyled',
    width: 'auto',
    border: '1px solid #fff',
    backgroundColor: 'transparent',
    borderRadius: '50px',
    color: '#fff',
    fontWeight: 'normal',
    _hover: {
      backgroundColor: '#EAEAEA',
      color: '#050202',
    },
    transition:
      'background-color 0.3s ease, color 0.3s ease, transform 0.2s ease',
  },
});

const FoodRecomendationBtn = ({ value = '', onClick }) => {
  return (
    <StyledFoodRecomendationBtn
      onClick={() => onClick && onClick(value)}
      h={{ base: '30px', md: '40px' }}
      px={{ base: '12px', md: '20px' }}
      fontSize={{ base: '13px', md: '16px' }}
    >
      {value}
    </StyledFoodRecomendationBtn>
  );
};

export default FoodRecomendationBtn;
