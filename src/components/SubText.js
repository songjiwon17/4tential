import { Text } from '@chakra-ui/react';
/**
 * [공용 컴포넌트] 페이지 서브 텍스트
 * - 메인 타이틀 하단에 위치하여 부가 설명이나 가이드 문구를 표시
 * - 테마(Theme)에 정의된 'subText' 스타일 변형(variant)을 사용하여 일관된 디자인을 제공
 */
const SubText = ({ subText = '' }) => {
  return (
    <Text variant="subText" mt={5} textAlign={'center'}>
      {subText}
    </Text>
  );
};

export default SubText;
