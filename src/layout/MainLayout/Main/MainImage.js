import { Text, Box, chakra, Image, Flex } from '@chakra-ui/react';
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
          width="100%"
          maxW="800px"
          mx="auto"
          textAlign="center"
          wordBreak="keep-all"
          whiteSpace="pre-wrap"
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          textShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
          zIndex={100}
          lineHeight={{ base: '1.6', md: '1.5' }}
          top={{ base: '70%', md: '50%' }}
        >
          {message}
        </Text>
      )}
    </Box>
  );
};

export default MainImage;
