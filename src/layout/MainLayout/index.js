import { Outlet, useLocation } from 'react-router-dom';
import { useMainMessage } from '../../store/query/QueryPath';
import Header from './Header/Header';
import MainImage from './Main/MainImage';
import Footer from './Footer/Footer';
import { Box, Flex } from '@chakra-ui/react';
import { HEADER_HEIGHT_PT } from '../../themes/style';
/**
 * [레이아웃] 메인 레이아웃 (MainLayout)
 * - 애플리케이션의 전체적인 구조(Header, Content, Footer)를 정의하는 최상위 컴포넌트
 * - 현재 경로(Pathname)를 감지하여 메인 페이지와 프로필 페이지에서만 메인 이미지(MainImage)를 조건부 렌더링
 */
const MainLayout = () => {
  // 현재 페이지의 경로(Pathname) 정보
  const mainPageLocation = useLocation();

  // 메인 이미지를 노출할 페이지인지 판단
  const mainImage =
    mainPageLocation.pathname === '/profile' ||
    mainPageLocation.pathname === '/';

  // 메인 배너에 표시할 동기부여 명언 데이터를 비동기로 호출
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
