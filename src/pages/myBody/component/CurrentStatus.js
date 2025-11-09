import { Flex, Text } from '@chakra-ui/react';

const CurrentStatus = () => {
  return (
    <>
      <Text
        color={'#FFF'}
        fontSize={'lg'}
        fontWeight={'semibold'}
        mb={8}
        width={'100%'}
      >
        현재 상태
      </Text>

      <Flex
        border={'1px solid'}
        borderColor={'rgba(255, 255, 255, 0.1)'}
        borderRadius={'12px'}
        overflow={'hidden'}
        bg={'rgba(255, 255, 255, 0.02)'}
        mt={6}
      >
        <Flex
          direction={'column'}
          align={'center'}
          justify={'center'}
          flex={1}
          py={5}
          borderRight={'1px solid'}
          borderColor={'rgba(255, 255, 255, 0.1)'}
          transition={'all 0.3s ease'}
          _hover={{
            bg: 'rgba(255, 255, 255, 0.05)',
            transform: 'scale(1.02)',
          }}
        >
          <Text color={'#888'} fontSize={'xs'} mb={2} fontWeight={'medium'}>
            키
          </Text>
          <Text color={'#FFF'} fontSize={'2xl'} fontWeight={'bold'}>
            158cm
          </Text>
        </Flex>
        <Flex
          direction={'column'}
          align={'center'}
          justify={'center'}
          flex={1}
          py={5}
          borderRight={'1px solid'}
          borderColor={'rgba(255, 255, 255, 0.1)'}
          transition={'all 0.3s ease'}
          _hover={{
            bg: 'rgba(255, 255, 255, 0.05)',
            transform: 'scale(1.02)',
          }}
        >
          <Text color={'#888'} fontSize={'xs'} mb={2} fontWeight={'medium'}>
            체중
          </Text>
          <Text color={'#FFF'} fontSize={'2xl'} fontWeight={'bold'}>
            50kg
          </Text>
        </Flex>
        <Flex
          direction={'column'}
          align={'center'}
          justify={'center'}
          flex={1}
          py={5}
          borderRight={'1px solid'}
          borderColor={'rgba(255, 255, 255, 0.1)'}
          transition={'all 0.3s ease'}
          _hover={{
            bg: 'rgba(255, 255, 255, 0.05)',
            transform: 'scale(1.02)',
          }}
        >
          <Text color={'#888'} fontSize={'xs'} mb={2} fontWeight={'medium'}>
            근육량
          </Text>
          <Text color={'#FFF'} fontSize={'2xl'} fontWeight={'bold'}>
            21kg
          </Text>
        </Flex>
        <Flex
          direction={'column'}
          align={'center'}
          justify={'center'}
          flex={1}
          py={5}
          transition={'all 0.3s ease'}
          _hover={{
            bg: 'rgba(255, 255, 255, 0.05)',
            transform: 'scale(1.02)',
          }}
        >
          <Text color={'#888'} fontSize={'xs'} mb={2} fontWeight={'medium'}>
            체지방량
          </Text>
          <Text color={'#FFF'} fontSize={'2xl'} fontWeight={'bold'}>
            28%
          </Text>
        </Flex>
      </Flex>
    </>
  );
};

export default CurrentStatus;
