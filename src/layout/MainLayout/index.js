import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header/Header';
import MainImage from './Main/MainImage';

const MainLayout = () => {
  const mainPageLoocation = useLocation();
  const mainImage =
    mainPageLoocation.pathname === '/profile' ||
    mainPageLoocation.pathname === '/';

  return (
    <>
      <Header />
      {mainImage && <MainImage />}
      <Outlet />
    </>
  );
};

export default MainLayout;
