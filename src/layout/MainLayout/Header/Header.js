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
        <Text as={Link} to="/" fontWeight={'bold'} cursor={'pointer'}>
          4TENTIAL
        </Text>

        <NaviBar
          navigation={{ items: [{ ...MainRoutes }] }}
          title={true}
          root={MainRoutes.root}
        />

        {isLogin ? (
          <Text
            color="#FFFFFF"
            fontWeight={'bold'}
            fontSize={['14px', '16px', '18px', '20px']}
          >
            {profile.name}님💪
          </Text>
        ) : (
          <Button
            as={Link}
            to="/login"
            variant="unstyled"
            color={'#FFFFFF'}
            fontSize={['14px', '16px', '18px', '20px']}
          >
            로그인
          </Button>
        )}
      </NaviBox>
    </Stack>
  );
};
export default Header;
