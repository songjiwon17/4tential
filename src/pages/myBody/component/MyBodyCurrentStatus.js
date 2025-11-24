import { useAtomValue } from 'jotai';
import { profileSavedAtom } from '../../../store/atoms/ProfileAtoms';
import MyBodyTitle from './MyBodyTitle';
import { Flex, Text } from '@chakra-ui/react';

const MyBodyCurrentStatus = () => {
  const profileData = useAtomValue(profileSavedAtom);

  const stats = [
    { label: '키', value: profileData.height || '170', unit: 'cm' },
    { label: '체중', value: profileData.weight || '70', unit: 'kg' },
    { label: '근육량', value: profileData.muscle || '25', unit: 'kg' },
    { label: '체지방률', value: profileData.bodyFat || '20', unit: '%' },
  ];

  return (
    <>
      <MyBodyTitle>현재 상태</MyBodyTitle>

      <Flex
        border={'1px solid'}
        borderColor={'rgba(255, 255, 255, 0.1)'}
        borderRadius={'12px'}
        overflow={'hidden'}
        bg={'rgba(255, 255, 255, 0.02)'}
        mt={6}
      >
        {stats.map((stat, index) => (
          <Flex
            key={stat.label}
            direction={'column'}
            align={'center'}
            justify={'center'}
            flex={1}
            py={5}
            borderRight={index < stats.length - 1 ? '1px solid' : 'none'}
            borderColor={'rgba(255, 255, 255, 0.1)'}
            transition={'all 0.3s ease'}
            _hover={{
              bg: 'rgba(255, 255, 255, 0.05)',
              transform: 'scale(1.02)',
            }}
          >
            <Text textStyle="grayText" mb={2}>
              {stat.label}
            </Text>
            <Text textStyle="whiteText">
              {stat.value}
              {stat.unit}
            </Text>
          </Flex>
        ))}
      </Flex>
    </>
  );
};

export default MyBodyCurrentStatus;
