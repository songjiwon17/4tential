import { Box, Button, chakra, Input } from '@chakra-ui/react';

export const LoginBox = chakra(Box, {
  baseStyle: {
    width: '700px',
    height: 'auto',
    padding: '40px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '30px',
    backgroundColor: '#fff',
    boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
  },
});

export const InputBox = chakra(Input, {
  baseStyle: {
    width: '100%',
    height: '40px',
    border: '1px solid #7D7D7D',
    backgroundColor: 'transparent',
    borderRadius: '5px',
    color: '#000',
    _placeholder: {
      color: '#7D7D7D',
      fontSize: ['10px', '12px', '14px', '16px'],
    },
  },
});

export const LoginBtn = chakra(Button, {
  baseStyle: {
    width: '100%',
    height: '40px',
    border: '1px solid #7D7D7D',
    backgroundColor: 'transparent',
    borderRadius: '5px',
    color: '#7D7D7D',
    fontSize: ['12px', '14px', '16px', '18px'],
    _hover: {
      backgroundColor: 'transparent',
    },
  },
});
