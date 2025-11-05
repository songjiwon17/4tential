import { Button, chakra } from '@chakra-ui/react';

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

const TypeButton = ({ value = '' }) => {
  return <TypeBtn>{value}</TypeBtn>;
};

export default TypeButton;
