import { extendTheme } from '@chakra-ui/react';

/**
 * [디자인 시스템] 커스텀 테마 설정
 * - Chakra UI의 기본 테마를 확장(extendTheme)하여 프로젝트 고유의 디자인 시스템을 정의
 * - 반응형 브레이크포인트(sm, md, lg, xl), 전역 스타일(Global Styles), 공통 텍스트 스타일 등을 통합 관리
 * - 컴포넌트(Text, Container)의 기본 스타일과 변형(Variants)을 미리 정의하여 개발 생산성과 디자인 일관성을 높임
 */

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
        width: '100%',
        minHeight: '100vh',
      },
    },
  },

  sizes: {
    container: {
      max: '1440px',
    },
  },

  // textStyles를 최상위로 이동
  textStyles: {
    // 섹션 제목 스타일
    sectionTitle: {
      color: '#FFF',
      fontSize: 'lg',
      fontWeight: 'semibold',
    },
    // 타임라인 라벨
    timelineLabel: {
      color: '#FF6B6B',
      fontSize: 'xl',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    // 수치 값 (큰 숫자)
    statValue: {
      color: '#000',
      fontSize: '3xl',
      fontWeight: 'bold',
      bgGradient: 'linear(to-r, #FF6B6B, #FF8E8E)',
      bgClip: 'text',
    },
    // 수치 라벨 (작은 글씨)
    statLabel: {
      color: '#666',
      fontSize: 'sm',
      fontWeight: 'medium',
    },
    // 회색 텍스트
    grayText: {
      color: '#888',
      fontSize: 'xs',
    },
    // 흰색 텍스트
    whiteText: {
      color: '#FFF',
      fontSize: '2xl',
      fontWeight: 'bold',
    },
  },

  components: {
    Text: {
      baseStyle: {
        fontSize: ['14px', '16px', '18px', '24px'],
      },
      variants: {
        mainMessageText: {
          fontSize: ['16px', '20px', '24px', '28px'],
          fontWeight: 'bold',
          textAlign: 'center',
          whiteSpace: 'normal',
          wordBreak: 'break-word',
          color: '#ffffff',
        },
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
        foodInfoNameText: {
          fontSize: ['10px', '12px', '14px', '16px'],
          color: 'gray.500',
        },
        loginText: {
          color: '#FFFFFF',
          fontSize: ['14px', '16px', '18px', '20px'],
          display: { base: 'none', md: 'block' },
        },
        loginInfonText: {
          fontSize: ['12px', '14px', '16px', '18px'],
          color: '#000000',
          textAlign: 'center',
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
  },
});

export default theme;
