import MainLayout from '../layout/MainLayout';
import ProfileBody from '../pages/ProfileBody';
import MyBody from '../pages/myBody';
import Workout from '../pages/workout';
import Food from '../pages/food';
import Login from '../pages/login';

const MainRoutes = {
  type: 'main',
  title: '4tential main',
  root: 'main',
  path: '/',
  element: <MainLayout />,
  children: [
    {
      type: 'item',
      title: 'profile',
      path: '/',
      element: <ProfileBody />,
    },
    {
      type: 'item',
      title: 'myBody',
      path: '/myBody',
      element: <MyBody />,
    },
    {
      type: 'item',
      title: 'workout',
      path: '/workout',
      element: <Workout />,
    },
    {
      type: 'item',
      title: 'food',
      path: '/food',
      element: <Food />,
    },
    {
      type: 'item',
      title: 'login',
      path: '/login',
      element: <Login />,
    },
  ],
};

export default MainRoutes;
