import {
  Box,
  Flex,
  Text,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from '@chakra-ui/react';

const PredictedChanges = () => {
  return (
    <>
      <Text
        color={'#FFF'}
        fontSize={'lg'}
        fontWeight={'semibold'}
        mb={8}
        width={'100%'}
      >
        미리보는 나의 변화
      </Text>

      <Box px={4} mb={6} width={'100%'}>
        <Slider defaultValue={0} min={0} max={100} focusThumbOnChange={false}>
          <SliderTrack bg={'rgba(255, 255, 255, 0.1)'} h={'4px'}>
            <SliderFilledTrack bgGradient={'linear(to-r, #FF6B6B, #FF8E8E)'} />
          </SliderTrack>
          <SliderThumb
            boxSize={6}
            bg={'#FFF'}
            boxShadow={'0 4px 16px rgba(255, 107, 107, 0.5)'}
            _hover={{
              transform: 'scale(1.2)',
            }}
            transition={'all 0.2s ease'}
          />
        </Slider>

        <Flex justify={'space-between'} mt={3}>
          <Text
            color={'#888'}
            fontSize={'xs'}
            fontWeight={'medium'}
            _hover={{ color: '#FFF' }}
            transition={'color 0.2s ease'}
          >
            현재
          </Text>
          <Text
            color={'#888'}
            fontSize={'xs'}
            fontWeight={'medium'}
            _hover={{ color: '#FFF' }}
            transition={'color 0.2s ease'}
          >
            3개월 후
          </Text>
          <Text
            color={'#888'}
            fontSize={'xs'}
            fontWeight={'medium'}
            _hover={{ color: '#FFF' }}
            transition={'color 0.2s ease'}
          >
            6개월 후
          </Text>
          <Text
            color={'#888'}
            fontSize={'xs'}
            fontWeight={'medium'}
            _hover={{ color: '#FFF' }}
            transition={'color 0.2s ease'}
          >
            1년 후
          </Text>
        </Flex>
      </Box>

      <Flex
        bgGradient={'linear(to-br, #F5F5F5, #E5E5E5)'}
        borderRadius={'12px'}
        p={6}
        justify={'space-around'}
        align={'center'}
        boxShadow={'inset 0 2px 8px rgba(0, 0, 0, 0.1)'}
        width={'100%'}
      >
        <Flex
          direction={'column'}
          align={'center'}
          p={3}
          borderRadius={'8px'}
          transition={'all 0.3s ease'}
          _hover={{
            bg: 'rgba(255, 107, 107, 0.1)',
            transform: 'translateY(-2px)',
          }}
        >
          <Text
            color={'#000'}
            fontSize={'3xl'}
            fontWeight={'bold'}
            mb={1}
            bgGradient={'linear(to-r, #FF6B6B, #FF8E8E)'}
            bgClip={'text'}
          >
            48.0kg
          </Text>
          <Text color={'#666'} fontSize={'sm'} fontWeight={'medium'}>
            체중
          </Text>
        </Flex>
        <Flex
          direction={'column'}
          align={'center'}
          p={3}
          borderRadius={'8px'}
          transition={'all 0.3s ease'}
          _hover={{
            bg: 'rgba(255, 107, 107, 0.1)',
            transform: 'translateY(-2px)',
          }}
        >
          <Text
            color={'#000'}
            fontSize={'3xl'}
            fontWeight={'bold'}
            mb={1}
            bgGradient={'linear(to-r, #FF6B6B, #FF8E8E)'}
            bgClip={'text'}
          >
            22.0kg
          </Text>
          <Text color={'#666'} fontSize={'sm'} fontWeight={'medium'}>
            근육량
          </Text>
        </Flex>
        <Flex
          direction={'column'}
          align={'center'}
          p={3}
          borderRadius={'8px'}
          transition={'all 0.3s ease'}
          _hover={{
            bg: 'rgba(255, 107, 107, 0.1)',
            transform: 'translateY(-2px)',
          }}
        >
          <Text
            color={'#000'}
            fontSize={'3xl'}
            fontWeight={'bold'}
            mb={1}
            bgGradient={'linear(to-r, #FF6B6B, #FF8E8E)'}
            bgClip={'text'}
          >
            25.0%
          </Text>
          <Text color={'#666'} fontSize={'sm'} fontWeight={'medium'}>
            체지방량
          </Text>
        </Flex>
      </Flex>
    </>
  );
};

export default PredictedChanges;
