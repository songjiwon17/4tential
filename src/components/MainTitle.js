import { chakra, Text } from '@chakra-ui/react';

const SubTitle = chakra(Text, {
  baseStyle: {
    fontSize: 'xl',
    fontWeight: 'bold',
    marginTop: '40px',
  },
});

const MainTitle = ({ mainTitle = '' }) => {
  return <SubTitle>{mainTitle}</SubTitle>;
};

export default MainTitle;
