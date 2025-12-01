import MainLayout from '../layout/MainLayout';
import ProfileBody from '../pages/ProfileBody';
import MyBody from '../pages/myBody';
import Workout from '../pages/workout';
import Food from '../pages/food';
import Login from '../pages/login';

/**
 * [라우터] 메인 라우트 설정 (MainRoutes)
 * - 웹페이지의 전체 페이지 구조와 경로(Path)를 정의하는 설정 객체
 * - MainLayout을 최상위 부모 라우트로 두고, 그 하위에 각 페이지(프로필, 나의 체형, 운동추천, 식단검색, 로그인)를 중첩
 * - 이 구조를 통해 헤더와 푸터 같은 공통 레이아웃이 유지되면서 내부 콘텐츠(Outlet)만 변경됨
 */

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
