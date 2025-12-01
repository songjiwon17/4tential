import { Box } from '@chakra-ui/react';
/**
 * [공용 컴포넌트] 카드 뱃지/라벨 (Badge)
 * - 운동 카드나 이미지의 우측 상단에 위치하여 카테고리나 상태 정보를 표시
 * - 절대 위치(absolute)로 고정되어 있으며, 파란색 배경(#4A90E2)의 둥근 라벨 스타일
 */
const Badge = ({ children, ...props }) => {
  return (
    <Box
      position="absolute"
      top={2}
      right={2}
      bg="#4A90E2"
      color="white"
      px={3}
      py={1}
      borderRadius="full"
      fontSize="xs"
      fontWeight="bold"
      zIndex={1}
      {...props}
    >
      {children}
    </Box>
  );
};

export default Badge;
