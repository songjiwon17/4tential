import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// 경로(pathname)가 바뀔 때마다 스크롤을 좌표 0,0 (맨 위)으로 이동
const ScrollTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollTop;
