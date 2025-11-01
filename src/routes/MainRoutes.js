import MainLayout from '../layout/MainLayout';
import Profile from '../pages/profile';
import MyBody from '../pages/myBody';
import Workout from '../pages/workout';
import Food from '../pages/food';

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
      element: <Profile />,
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
  ],
};

export default MainRoutes;
