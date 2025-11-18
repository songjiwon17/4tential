import { useEffect, useRef, useState } from 'react';
import Profile from '../profile';
import MyBody from '../myBody';
import { Box } from '@chakra-ui/react';
import { SCROLL_OFFSET } from '../../themes/style';

const ProfileBody = () => {
  const [isProfileSaved, setIsProfileSaved] = useState(false);
  // 나의 체형 페이지 위치
  const myBodyRef = useRef(null);

  useEffect(() => {
    if (isProfileSaved && myBodyRef.current) {
      myBodyRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isProfileSaved]);

  const handleSaveAndScroll = (savedData) => {
    console.log('SAVED PROFILES:', savedData);
    setIsProfileSaved(true);
  };

  return (
    <>
      <Profile onSave={handleSaveAndScroll}></Profile>

      {isProfileSaved && (
        <Box ref={myBodyRef} mt={30} mb={20} scrollMarginTop={SCROLL_OFFSET}>
          <MyBody />
        </Box>
      )}
    </>
  );
};
export default ProfileBody;
