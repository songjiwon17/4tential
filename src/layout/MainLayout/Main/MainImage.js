import { Text, Box, chakra, Image } from '@chakra-ui/react';
import mainImage from '../../../assets/images/mainImage.png';

// 메인 이미지 위에 올라는 검정 반투명 박스
const ImageBlackBox = chakra(Box, {
  baseStyle: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: '0',
    left: '0',
    bg: 'rgba(5, 2, 2, 0.52)',
    zIndex: '1',
  },
});

const MainImage = ({ message }) => {
  return (
    <Box position="relative" overflow="hidden">
      <Image
        src={mainImage}
        alt={'메인 이미지'}
        objectFit="cover"
        width="100%"
        height="100%"
      />

      {/*  이미지 어둡게 처리 위한 검정 박스 */}
      <ImageBlackBox
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        bg="rgba(5, 2, 2, 0.52)"
        zIndex="1"
      />

      {/*  명언 메시지 텍스트 */}
      {message && (
        <Text
          variant="mainMessageText"
          maxW="750px"
          mx="auto"
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          zIndex={100}
        >
          {message}
        </Text>
      )}
    </Box>
  );
};

export default MainImage;
