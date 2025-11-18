import { Outlet, useLocation } from 'react-router-dom';
import { useMainMessage } from '../../store/query/QueryPath';
import Header from './Header/Header';
import MainImage from './Main/MainImage';
import Footer from './Footer/Footer';
import { Box, Flex } from '@chakra-ui/react';
import { HEADER_HEIGHT_PT } from '../../themes/style';

const MainLayout = () => {
  const mainPageLocation = useLocation();
  const mainImage =
    mainPageLocation.pathname === '/profile' ||
    mainPageLocation.pathname === '/';

  const { data: message } = useMainMessage();

  return (
    <Flex direction={'column'} width={'100%'} minHeight={'100vh'}>
      <Header />

      <Box flex={1} pt={mainImage ? '0px' : HEADER_HEIGHT_PT}>
        {mainImage && <MainImage message={message} />}
        <Outlet />
      </Box>

      <Footer />
    </Flex>
  );
};

export default MainLayout;
