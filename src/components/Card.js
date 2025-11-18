import { Box, chakra } from '@chakra-ui/react';

const StyledCard = chakra(Box, {
  baseStyle: {
    width: 'full',
    borderRadius: '10px',
    overflow: 'hidden',
    border: '1px solid #333',
    backgroundColor: '#0a0a0a',
    cursor: 'pointer',
    transition: 'all 0.3s',
    _hover: {
      transform: 'translateY(-5px)',
      boxShadow: '0 8px 15px rgba(0, 0, 0, 0.5)',
      borderColor: '#4A90E2',
    },
  },
});

const Card = ({ children, isHighlighted = false, ...props }) => {
  return (
    <StyledCard
      border={isHighlighted ? '2px solid #4A90E2' : '1px solid #333'}
      _hover={{
        transform: 'translateY(-5px)',
        boxShadow: isHighlighted
          ? '0 8px 20px rgba(74, 144, 226, 0.4)'
          : '0 8px 15px rgba(0, 0, 0, 0.5)',
        borderColor: '#4A90E2',
        transition: 'all 0.3s',
      }}
      {...props}
    >
      {children}
    </StyledCard>
  );
};

export default Card;
