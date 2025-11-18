import { Outlet, useLocation } from 'react-router-dom';
import { useMainMessage } from '../../store/query/QueryPath';
import Header from './Header/Header';
import MainImage from './Main/MainImage';
import Footer from './Footer/Footer';

const MainLayout = () => {
  const mainPageLocation = useLocation();
  const mainImage =
    mainPageLocation.pathname === '/profile' ||
    mainPageLocation.pathname === '/';

  const { data: message } = useMainMessage();

  return (
    <>
      <Header />
      {mainImage && <MainImage message={message} />}
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
