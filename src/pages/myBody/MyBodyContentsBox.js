import {
  Box,
  Flex,
  Text,
  Badge,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Center,
} from '@chakra-ui/react';

const MyBodyContentsBox = () => {
  return (
    <Flex direction={'column'} gap={10} pb={20}>
      {/* 1. 슬라이딩 방식 안내 상태 */}
      <Box
        width={['90%', '80%', '80%', '954px']}
        border={'1px solid #ffffff'}
        borderRadius={'10px'}
        p={'24px'}
        bg={'#050202'}
      >
        <Flex justify={'space-between'} align={'center'} mb={6}>
          <Text color={'#FFF'} fontSize={'lg'} fontWeight={'medium'}>
            슬라이딩 방식 안내 상태
          </Text>
          <Badge
            px={3}
            py={1}
            borderRadius={'full'}
            fontSize={'sm'}
            fontWeight={'medium'}
            bg={'#FF6B6B'}
            color={'#FFF'}
          >
            다이어트
          </Badge>
        </Flex>

        <Box borderTop={'1px solid #333'} mb={6} />

        <Flex
          border={'1px solid'}
          borderColor={'#444'}
          borderRadius={'md'}
          overflow={'hidden'}
        >
          <Flex
            direction={'column'}
            align={'center'}
            justify={'center'}
            flex={1}
            py={4}
            borderRight={'1px solid'}
            borderColor={'#444'}
          >
            <Text color={'#999'} fontSize={'sm'} mb={2}>
              키
            </Text>
            <Text color={'#FFF'} fontSize={'xl'} fontWeight={'medium'}>
              158cm
            </Text>
          </Flex>
          <Flex
            direction={'column'}
            align={'center'}
            justify={'center'}
            flex={1}
            py={4}
            borderRight={'1px solid'}
            borderColor={'#444'}
          >
            <Text color={'#999'} fontSize={'sm'} mb={2}>
              체중
            </Text>
            <Text color={'#FFF'} fontSize={'xl'} fontWeight={'medium'}>
              50kg
            </Text>
          </Flex>
          <Flex
            direction={'column'}
            align={'center'}
            justify={'center'}
            flex={1}
            py={4}
            borderRight={'1px solid'}
            borderColor={'#444'}
          >
            <Text color={'#999'} fontSize={'sm'} mb={2}>
              근육량
            </Text>
            <Text color={'#FFF'} fontSize={'xl'} fontWeight={'medium'}>
              21kg
            </Text>
          </Flex>
          <Flex
            direction={'column'}
            align={'center'}
            justify={'center'}
            flex={1}
            py={4}
          >
            <Text color={'#999'} fontSize={'sm'} mb={2}>
              체지방량
            </Text>
            <Text color={'#FFF'} fontSize={'xl'} fontWeight={'medium'}>
              28%
            </Text>
          </Flex>
        </Flex>
      </Box>

      {/* 2. 미리보는 나의 변화 */}
      <Box
        width={['90%', '80%', '80%', '954px']}
        border={'1px solid #ffffff'}
        borderRadius={'10px'}
        p={'24px'}
        bg={'#050202'}
      >
        <Text color={'#FFF'} fontSize={'lg'} fontWeight={'medium'} mb={6}>
          미리보는 나의 변화
        </Text>

        <Box borderTop={'1px solid #333'} mb={6} />

        <Box px={4} mb={6}>
          <Slider defaultValue={0} min={0} max={100}>
            <SliderTrack bg={'#333'} h={'2px'}>
              <SliderFilledTrack bg={'#666'} />
            </SliderTrack>
            <SliderThumb boxSize={4} bg={'#FFF'} />
          </Slider>

          <Flex justify={'space-between'} mt={2}>
            <Text color={'#999'} fontSize={'xs'}>
              현재
            </Text>
            <Text color={'#999'} fontSize={'xs'}>
              3개월 후
            </Text>
            <Text color={'#999'} fontSize={'xs'}>
              6개월 후
            </Text>
            <Text color={'#999'} fontSize={'xs'}>
              1년 후
            </Text>
          </Flex>
        </Box>

        <Flex
          bg={'#E5E5E5'}
          borderRadius={'md'}
          p={6}
          justify={'space-around'}
          align={'center'}
        >
          <Flex direction={'column'} align={'center'}>
            <Text color={'#000'} fontSize={'2xl'} fontWeight={'bold'} mb={1}>
              48.0kg
            </Text>
            <Text color={'#666'} fontSize={'sm'}>
              체중
            </Text>
          </Flex>
          <Flex direction={'column'} align={'center'}>
            <Text color={'#000'} fontSize={'2xl'} fontWeight={'bold'} mb={1}>
              22.0kg
            </Text>
            <Text color={'#666'} fontSize={'sm'}>
              근육량
            </Text>
          </Flex>
          <Flex direction={'column'} align={'center'}>
            <Text color={'#000'} fontSize={'2xl'} fontWeight={'bold'} mb={1}>
              25.0%
            </Text>
            <Text color={'#666'} fontSize={'sm'}>
              체지방량
            </Text>
          </Flex>
        </Flex>
      </Box>

      {/* 3. 3개월 주기 나의 체형 */}
      <Box
        width={['90%', '80%', '80%', '954px']}
        border={'1px solid #ffffff'}
        borderRadius={'10px'}
        p={'24px'}
        bg={'#050202'}
      >
        <Text color={'#FFF'} fontSize={'lg'} fontWeight={'medium'} mb={6}>
          3개월 주기 나의 체형
        </Text>

        <Box borderTop={'1px solid #333'} mb={6} />

        <Center bg={'#D9D9D9'} borderRadius={'md'} h={'400px'}>
          <Text color={'#999'} fontSize={'md'}>
            주중 결과 예정
          </Text>
        </Center>
      </Box>

      {/* 하단 안내 문구 */}
      <Text textAlign={'center'} color={'#999'} fontSize={'sm'}>
        슬라이더는 이동해와 실시간으로 체형 변화를 확인해보세요.
      </Text>
    </Flex>
  );
};

export default MyBodyContentsBox;
