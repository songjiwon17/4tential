import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  breakpoints: {
    sm: '480px', // 모바일
    md: '768px', // 태블릿
    lg: '1024px', // 창 줄인 데스크탑
    xl: '1440px', // 기본 데스크탑
  },

  styles: {
    global: {
      'html, body': {
        width: '100%',
        height: '100%',
        margin: 0,
        padding: 0,
        backgroundColor: '#050202',
        color: '#ffffff',
        fontFamily: "'Inter', 'Noto Sans KR', sans-serif",
      },
      '#root': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      },
    },
  },

  sizes: {
    container: {
      max: '1440px',
    },
  },

  components: {
    Text: {
      baseStyle: {
        fontSize: ['14px', '16px', '18px', '24px'],
      },
      variants: {
        subText: {
          fontSize: ['12px', '14px', '16px', '18px'],
        },
        profileInputText: {
          fontSize: ['12px', '14px', '16px', '18px'],
          color: '#C7C7C7',
        },
        foodInfoText: {
          fontSize: ['18px', '20px', '22px', '24px'],
          color: '#000000',
        },
      },
    },

    Container: {
      baseStyle: {
        maxW: '1440px',
        mx: 'auto',
        px: 4,
      },
    },

    // Button: {
    //   baseStyle: {
    //     fontWeight: 'normal',
    //     fontFamily: "'Inter', 'Noto Sans KR', sans-serif",
    //     // bg: 'transparent',
    //     // backgroundColor: 'none',
    //     borderRadius: 'none',
    //     _focus: { boxShadow: 'none' },
    //   },
    //   variants: {
    //     nav: (props) => ({
    //       // color: props.isActive ? '#ffffff' : '#7D7D7D',
    //       fontSize: ['18px', '20px', '22px', '24px'], // 반응형 (sm, md, lg, xl)
    //       // borderBottom: props.isActive
    //       //   ? '2px solid #ED64A6'
    //       //   : '2px solid transparent',
    //       transition: 'all 0.3s ease-in-out',
    //     }),
    //   },
    // },
  },
});

export default theme;
