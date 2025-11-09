import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header/Header';
import MainImage from './Main/MainImage';
import { useMainMessage } from '../../store/query/QueryPath';

const MainLayout = () => {
  const mainPageLoocation = useLocation();
  const mainImage =
    mainPageLoocation.pathname === '/profile' ||
    mainPageLoocation.pathname === '/';

  const { data: message } = useMainMessage();

  return (
    <>
      <Header />
      {mainImage && <MainImage message={message} />}
      <Outlet />
    </>
  );
};

export default MainLayout;
