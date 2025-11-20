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

const InputBox = chakra(Input, {
  baseStyle: {
    width: '100%',
    border: '1px solid #fff',
    backgroundColor: 'transparent',
    borderRadius: '50px',
    color: '#fff',
  },
});
const FoodInputBox = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState('');
  return (
    <InputGroup w="100%" maxW="1000px" mx="auto">
      <InputBox
        placeholder="검색어를 입력하세요"
        value={inputValue}
        h={{ base: '50px', md: '60px' }}
        pl={{ base: '20px', md: '30px' }}
        fontSize={{ base: '14px', md: '16px' }}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            onSearch(inputValue.trim());
            setInputValue('');
          }
        }}
      />
      <InputRightElement
        height="100%"
        ml={2}
        right={{ base: '10px', md: '15px' }}
      >
        <Button
          p="0"
          bg="transparent"
          _hover={{ bg: 'whiteAlpha.200' }}
          onClick={() => {
            onSearch(inputValue.trim());
            setInputValue('');
          }}
        >
          <Image
            src={searchIcon}
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
