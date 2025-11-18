import { Box, chakra, Text } from '@chakra-ui/react';

const FooterBox = chakra(Box, {
  baseStyle: {
    width: '100%',
    height: '60px',
    padding: '20px',
    backgroundColor: '#111111',
  },
});

const Footer = () => {
  return (
    <FooterBox>
      <Text color={'#7D7D7D'} fontSize={'12px'}>
        copyright @4tential 2025. ALL Rights Reserved.
      </Text>
    </FooterBox>
  );
};

export default Footer;
