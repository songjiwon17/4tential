import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
/**
 *   페이지 이동 시 스크롤 초기화 (Scroll To Top)
 * - React Router로 페이지 이동 시, 이전 페이지의 스크롤 위치가 유지되는 현상을 방지하기 위함
 * - 경로(Pathname)가 변경될 때마다 화면의 최상단(0, 0)으로 강제 이동
 */
const ScrollTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollTop;
