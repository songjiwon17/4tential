import { useEffect, useRef, useState } from 'react';
import Profile from '../profile';
import MyBody from '../myBody';
import { Box } from '@chakra-ui/react';
import { SCROLL_OFFSET } from '../../themes/style';

/**
 *    프로필 및 체형 예측 통합 페이지 (ProfileBody)
 * - 사용자로부터 프로필을 입력받는 `Profile` 컴포넌트와,
 *   그 결과를 바탕으로 미래 체형을 보여주는 `MyBody` 컴포넌트를 연결하는 컨테이너
 * - 프로필 저장 시, 숨겨져 있던 `MyBody` 섹션을 노출하고 해당 위치로 부드럽게 스크롤을 이동시키는 UX 로직을 담당
 */

const ProfileBody = () => {
  const [isProfileSaved, setIsProfileSaved] = useState(false);
  // 나의 체형 페이지 위치
  const myBodyRef = useRef(null);

  // 스크롤 자동 이동 처리
  // 프로필이 저장되어 `isProfileSaved`가 true가 되면, MyBody 페이지가 있는 위치로 스크롤
  useEffect(() => {
    if (isProfileSaved && myBodyRef.current) {
      myBodyRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isProfileSaved]);

  // 저장 완료 시 콘솔에 객체 값 찍히도록 구현 및 스크롤
  const handleSaveAndScroll = (savedData) => {
    console.log('SAVED PROFILES:', savedData);
    setIsProfileSaved(true);
  };

  return (
    <>
      <Profile onSave={handleSaveAndScroll}></Profile>

      {/* 프로필 저장 완료 시 나의 체형 페이지가 보여짐 */}
      {isProfileSaved && (
        <Box ref={myBodyRef} mt={30} mb={20} scrollMarginTop={SCROLL_OFFSET}>
          <MyBody />
        </Box>
      )}
    </>
  );
};
export default ProfileBody;
