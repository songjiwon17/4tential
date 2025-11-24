import { useState } from 'react';
import { Image, Text, VStack, Box } from '@chakra-ui/react';
import Card from '../../../components/Card';
import Badge from '../../../components/Badge';
import TypeButton from '../../../components/TypeButton';

const WorkoutCard = ({ workout, isRecommended }) => {
  // 카드 뒤집기 상태 관리
  const [isFlipped, setIsFlipped] = useState(false);

  // 카드 클릭 시 뒤집기

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <Box
      position="relative"
      w="100%"
      h={['400px', '500px']}
      style={{ perspective: '1000px' }}
      onClick={handleFlip}
      cursor="pointer"
    >
      {/* 카드 컨테이너 */}
      <Box
        position="relative"
        w="100%"
        h="100%"
        transition="transform 0.6s"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* 앞면 */}
        <Box
          position="absolute"
          w="100%"
          h="100%"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          <Card isHighlighted={isRecommended} position="relative" h="100%">
            {isRecommended && <Badge>⭐ 추천</Badge>}

            <VStack align="flex-start" spacing={0} p={0} h="100%">
              <Image
                src={workout.imageUrl}
                alt={workout.title}
                w="full"
                h={['150px', '220px']}
                objectFit="cover"
              />

              <VStack align="flex-start" spacing={3} p={5} w="full" flex={1}>
                <Box maxW="100%">
                  <TypeButton value={workout.type} isSelected={isRecommended} />
                </Box>

                <Text
                  fontSize="lg"
                  fontWeight="bold"
                  color="#fff"
                  noOfLines={2}
                >
                  {workout.title}
                </Text>

                <VStack
                  fontSize="sm"
                  color="#bbb"
                  align="flex-start"
                  spacing={1}
                  lineHeight="1.6"
                  w="full"
                >
                  <Text>시간: {workout.time}</Text>
                  <Text>세트: {workout.sets}</Text>
                  {workout.rest && <Text>휴식: {workout.rest}</Text>}
                  <Text mt={2} color="#888" fontSize="xs" noOfLines={3}>
                    {workout.description}
                  </Text>
                </VStack>

                <Text
                  fontSize="xs"
                  color="#4A90E2"
                  mt="auto"
                  textAlign="center"
                  w="100%"
                >
                  클릭하여 상세 정보 보기 →
                </Text>
              </VStack>
            </VStack>
          </Card>
        </Box>

        {/* 뒷면 */}
        <Box
          position="absolute"
          w="100%"
          h="100%"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <Card
            isHighlighted={isRecommended}
            position="relative"
            h="100%"
            bg="linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)"
          >
            <VStack align="center" justify="center" h="100%" spacing={4} p={6}>
              {/* 뒷면 내용 */}
              <Text fontSize="2xl" fontWeight="bold" color="#fff">
                {workout.title}
              </Text>

              <Text fontSize="xs" color="#4A90E2" mt="auto" textAlign="center">
                ← 클릭하여 돌아가기
              </Text>
            </VStack>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default WorkoutCard;
