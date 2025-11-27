import {
  InputGroup,
  InputRightElement,
  Input,
  Image,
  chakra,
  Button,
} from '@chakra-ui/react';
import searchIcon from '../../../assets/images/icons/readingGlassesIcon.svg';
import { useState } from 'react';

/**
 * ============================================
 * 커스텀 인풋 스타일 정의
 * ============================================
 *
 * Chakra UI factory를 사용해 기본 Input 컴포넌트에
 * 둥근 모서리(50px)와 투명 배경 스타일을 적용
 *
 */

const InputBox = chakra(Input, {
  baseStyle: {
    width: '100%',
    border: '1px solid #fff',
    backgroundColor: 'transparent', // 투명 배경 설정.
    borderRadius: '50px', // 캡슐 모양 디자인.
    color: '#fff',
  },
});
const FoodInputBox = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState('');
  return (
    // InputGroup: 인풋 창과 내부의 돋보기 버튼을 하나의 그룹으로 묶어줌.
    <InputGroup w="100%" maxW="1000px" mx="auto">
      <InputBox
        placeholder="검색어를 입력하세요"
        value={inputValue}
        // 화면 너비에 따른 반응형 사이즈 및 여백 설정.
        h={{ base: '50px', md: '60px' }}
        pl={{ base: '20px', md: '30px' }}
        fontSize={{ base: '14px', md: '16px' }}
        // 입력값이 변할 때마다 상태 업데이트.
        onChange={(e) => setInputValue(e.target.value)}
        // 엔터키가 눌렸을 때 검색 실행.
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            // 앞뒤 공백 제거 후 부모 컴포넌트에게 전달.
            onSearch(inputValue.trim());
            setInputValue('');
          }
        }}
      />
      <InputRightElement
        height="100%"
        ml={2}
        right={{ base: '10px', md: '15px' }} // 화면 너비에 따른 반응형 사이즈 및 여백 설정.
      >
        <Button
          p="0"
          bg="transparent"
          _hover={{ bg: 'whiteAlpha.200' }} // 호버 시 살짝 밝아지는 효과.
          onClick={() => {
            // 앞뒤 공백 제거 후 부모 컴포넌트에게 전달.
            onSearch(inputValue.trim());
            setInputValue('');
          }}
        >
          <Image
            src={searchIcon}
            // 화면 너비에 따른 반응형 사이즈 설정
            width={{ base: '24px', md: '30px' }}
            height={{ base: '24px', md: '30px' }}
            alt="검색 버튼"
          />
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};
export default FoodInputBox;
