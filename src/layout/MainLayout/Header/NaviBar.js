import { Link, useLocation } from 'react-router-dom';
import { Flex, Button, Box, Heading } from '@chakra-ui/react';

const menus = [
  { title: '프로필', path: '/' },
  { title: '나의 체형', path: '/myBody' },
  { title: '운동 추천', path: '/workout' },
  { title: '식단 검색', path: '/food' },
];

const NaviBar = () => {
  const location = useLocation();

  return (
    <Flex gap={10}>
      {menus.map((menu) => (
        <Button
          key={menu.path}
          to={menu.path}
          as={Link}
          variant="unstyled"
          color={location.pathname === menu.path ? '#FFFFFF' : '#7D7D7D'}
          fontSize={'xl'}
        >
          {menu.title}
        </Button>
      ))}
    </Flex>
  );
};

export default NaviBar;
