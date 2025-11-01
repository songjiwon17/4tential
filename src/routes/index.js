import { useRoutes } from 'react-router-dom';
import MainRoutes from './MainRoutes';

// 리액트 라우터에서 사용할 중첩 라우트 자동으로 객체로 만드는 함수
const makeRouteObject = (navi) => {
  const mappedNavi = { path: navi.path, element: navi.element };
  if (navi.children && navi.children.length > 0) {
    mappedNavi.children = navi.children.map((child) => makeRouteObject(child));
  }
  return { ...mappedNavi };
};

export default function ThemeRoutes() {
  const mainRoutes = makeRouteObject(MainRoutes);
  return useRoutes([mainRoutes]);
}
