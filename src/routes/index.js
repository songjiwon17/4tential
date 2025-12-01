import { useRoutes } from 'react-router-dom';
import MainRoutes from './MainRoutes';

/**
 *   라우트 객체 생성 함수 (makeRouteObject)
 * - 정의된 라우트 설정(MainRoutes)을 기반으로 react-router-dom이 인식할 수 있는 객체 형태로 변환
 * - 자식 라우트(children)가 있을 경우 재귀적으로 호출하여 중첩 라우트 구조를 완성
 */
const makeRouteObject = (navi) => {
  const mappedNavi = { path: navi.path, element: navi.element };
  if (navi.children && navi.children.length > 0) {
    mappedNavi.children = navi.children.map((child) => makeRouteObject(child));
  }
  return { ...mappedNavi };
};

/**
 * [라우터] 테마 라우트 진입점 (ThemeRoutes)
 * - 애플리케이션의 모든 페이지 라우팅을 총괄하는 컴포넌트
 * - makeRouteObject를 통해 생성된 라우트 객체를 useRoutes 훅에 전달하여 화면을 렌더링
 */
export default function ThemeRoutes() {
  const mainRoutes = makeRouteObject(MainRoutes);
  return useRoutes([mainRoutes]);
}
