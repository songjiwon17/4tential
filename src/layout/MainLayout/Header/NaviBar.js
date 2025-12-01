import { Link, useLocation } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { isLoginAtom, profileSavedAtom } from '../../../store/atoms';
import {
  Flex,
  Button,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
  useDisclosure,
  Divider,
  Text,
  Box,
} from '@chakra-ui/react';
import menuPanelIcon from '../../../assets/images/icons/menuPanelIcon.png';

const menus = [
  { title: '프로필', path: '/' },
  { title: '나의 체형', path: '/myBody' },
  { title: '운동 추천', path: '/workout' },
  { title: '식단 검색', path: '/food' },
];

/**
 * [공용 컴포넌트] 네비게이션 바 (NaviBar)
 * - PC와 모바일 환경에 모두 대응하는 반응형 메뉴 컴포넌트
 * - PC에서는 상단 메뉴바로, 모바일에서는 햄버거 버튼과 드로어(Drawer) 메뉴로 변환
 * - 현재 경로(Location)를 감지하여 활성화된 메뉴를 강조하고, Jotai 상태를 통해 로그인 정보를 표시
 */

const NaviBar = () => {
  const location = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Jotai의 Atom을 으로 전역 상태(로그인 여부, 사용자 프로필 정보)를 실시간 가져옴
  const isLogin = useAtomValue(isLoginAtom);
  const profile = useAtomValue(profileSavedAtom);

  return (
    <>
      {/* PC 메뉴 */}
      <Flex
        alignItems={'center'}
        gap={10}
        display={{ base: 'none', md: 'flex' }}
      >
        {menus.map((menu) => (
          <Button
            key={menu.path}
            to={menu.path}
            as={Link}
            variant="unstyled"
            color={location.pathname === menu.path ? '#FFFFFF' : '#7D7D7D'}
            fontSize={['14px', '16px', '18px', '24px']}
          >
            {menu.title}
          </Button>
        ))}
      </Flex>

      {/* 모바일 메뉴 패널 (Drawer) */}
      <IconButton
        icon={
          <img
            src={menuPanelIcon}
            alt="mobile menu"
            style={{ width: '8vw', maxWidth: '30px' }}
          />
        }
        variant="unstyled"
        onClick={onOpen}
        display={{ base: 'flex', md: 'none' }}
        aria-label="Open Menu"
      />

      <Drawer isOpen={isOpen} onClose={onClose} placement="right">
        <DrawerOverlay />
        <DrawerContent bg="rgba(5, 2, 2, 0.95)" color="white">
          <DrawerCloseButton mt={2} color="white" />
          <DrawerBody mt={12}>
            <VStack spacing={6} align="start">
              <Box width="100%" pt={2}>
                {isLogin ? (
                  <Text
                    variant="loginText"
                    fontWeight={'bold'}
                    pl={1}
                    display="block"
                  >
                    {profile.name}님💪
                  </Text>
                ) : (
                  <Button
                    as={Link}
                    to="/login"
                    variant="unstyled"
                    onClick={onClose}
                  >
                    <Text variant="loginText" color="#7D7D7D" display="block">
                      로그인
                    </Text>
                  </Button>
                )}
              </Box>

              <Divider borderColor="#3C3C3C" />
              {menus.map((menu) => (
                <Button
                  key={menu.path}
                  to={menu.path}
                  as={Link}
                  variant="unstyled"
                  fontSize="20px"
                  width="100%"
                  textAlign="left"
                  color={
                    location.pathname === menu.path ? '#FFFFFF' : '#7D7D7D'
                  }
                  onClick={onClose}
                >
                  {menu.title}
                </Button>
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default NaviBar;
