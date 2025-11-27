import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { isLoginAtom, profileSavedAtom } from '../../../store/atoms';
import MainRoutes from '../../../routes/MainRoutes';
import NaviBar from './NaviBar';
import { Box, Button, chakra, Text, Stack } from '@chakra-ui/react';

const NaviBox = chakra(Box, {
  baseStyle: {
    width: '100%',
    height: '60px',
    padding: '40px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 1000,
    backgroundColor: 'transparent',
    transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
  },
});

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const isLogin = useAtomValue(isLoginAtom);
  const profile = useAtomValue(profileSavedAtom);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Stack>
      <NaviBox bg={isScrolled ? 'rgba(5, 2, 2, 0.95)' : 'transparent'}>
        <Text
          as={Link}
          to="/"
          fontWeight={'bold'}
          fontSize={'22px'}
          cursor={'pointer'}
        >
          4TENTIAL
        </Text>

        <NaviBar
          navigation={{ items: [{ ...MainRoutes }] }}
          title={true}
          root={MainRoutes.root}
        />

        <Box display={{ base: 'none', md: 'block' }}>
          {isLogin ? (
            <Text variant="loginText" fontWeight={'bold'}>
              {profile.name}님💪
            </Text>
          ) : (
            <Button as={Link} to="/login" variant="unstyled">
              <Text variant="loginText">로그인</Text>
            </Button>
          )}
        </Box>
      </NaviBox>
    </Stack>
  );
};
export default Header;
