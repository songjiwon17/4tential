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
    width: '1000px',
    height: '60px',
    border: '1px solid #fff',
    backgroundColor: 'transparent',
    borderRadius: '50px',
    color: '#fff',
    paddingLeft: '30px',
  },
});
const FoodInputBox = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState('');
  return (
    <InputGroup>
      <InputBox
        placeholder="검색어를 입력하세요"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            onSearch(inputValue.trim());
            setInputValue('');
          }
        }}
      />
      <InputRightElement height="100%" ml={2} right="15px">
        <Button
          p="0"
          bg="transparent"
          _hover={{ bg: 'whiteAlpha.200' }}
          onClick={() => {
            onSearch(inputValue.trim());
            setInputValue('');
          }}
        >
          <Image src={searchIcon} width="30" height="30" alt="검색 버튼" />
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};
export default FoodInputBox;
