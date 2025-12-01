import { Text } from '@chakra-ui/react';
/**
 * [공용 컴포넌트] 각 페이지 메인 타이틀
 * - 각 페이지 상단에 위치하는 주요 제목을 표시
 * - 텍스트 내용(mainTitle)과 폰트 굵기(fontWeight)를 커스텀할 수 있음
 */
const MainTitle = ({ mainTitle = '', fontWeight = 'bold' }) => {
  return (
    <Text mt={5} fontWeight={fontWeight} textAlign={'center'}>
      {mainTitle}
    </Text>
  );
};

export default MainTitle;
