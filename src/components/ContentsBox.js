import { Box, chakra } from '@chakra-ui/react';

const ContentBox = chakra(Box, {
  baseStyle: {
    width: ['90%', '80%', '80%', '954px'],
    minHeight: ['400px', '500px', '600px', '700px'],
    margin: '40px 0 60px 0',
    padding: '24px',
    border: '1px solid #ffffff',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#050202',
  },
});

const ContentsBox = ({ children, ...props }) => {
  return <ContentBox {...props}>{children}</ContentBox>;
};
export default ContentsBox;
