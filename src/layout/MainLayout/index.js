import { Outlet } from 'react-router-dom';
import Header from './Header/Header';
import MainImage from './Main/MainImage';

const MainLayout = () => {
  return (
    <>
      <Header />
      <MainImage />
      <Outlet />
    </>
  );
};

export default MainLayout;
