import { Box } from '@chakra-ui/react';
/**
 * [공용 컴포넌트] 섹션 구분선 (Line UI)
 * - 페이지 내 제목 하단이나 콘텐츠 구역을 시각적으로 분리할 때 사용
 * - 반응형 너비가 적용되어 화면 크기에 따라 길이가 자동으로 조절
 */
const Line = () => {
  return (
    <Box
      width={['80%', '70%', '80%', '600px', '600px']}
      height={'2px'}
      marginTop={'8px'}
      alignSelf={'flex-start'}
      backgroundColor={'#ffffff'}
    />
  );
};
export default Line;
