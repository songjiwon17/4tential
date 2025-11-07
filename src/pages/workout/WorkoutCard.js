import { Box, Image, Text, VStack } from '@chakra-ui/react';
import MainTitle from '../../components/MainTitle';
import TypeButton from '../../components/TypeButton';

const WorkoutCard = ({
  title,
  type,
  imageUrl,
  time,
  sets,
  rest,
  description,
}) => {
  return (
    <Box
      w="full"
      borderRadius="10px"
      overflow="hidden"
      border="1px solid #ffffff"
      bg="#050202"
    >
      <VStack align="flex-start" spacing={0} p={0}>
        {/* 운동 이미지 영역 (상단) */}
        <Image
          src={imageUrl}
          alt={title}
          w="full"
          h={['150px', '220px']}
          objectFit="cover"
        />

        {/* 텍스트 내용 영역 (하단) */}
        <VStack align="flex-start" spacing={1} p={5} w="full">
          {/* 운동 종류 (다이어트, 체력향상 등)*/}
          <TypeButton value={type} />
          <MainTitle mainTitle={title} />

          {/* 상세 정보 목록 */}
          <VStack
            fontSize="sm"
            color="#ddd"
            align="flex-start"
            spacing={1}
            lineHeight="1.6"
            mt={3}
          >
            <Text>• 시간: {time}</Text>
            <Text>• 세트: {sets}</Text>
            {rest && <Text>• 휴식: {rest}</Text>}
            <Text>• 설명: {description}</Text>
          </VStack>
        </VStack>
      </VStack>
    </Box>
  );
};

export default WorkoutCard;
