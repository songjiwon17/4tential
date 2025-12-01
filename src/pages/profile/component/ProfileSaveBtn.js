import { Button, chakra } from '@chakra-ui/react';

const SaveBtn = chakra(Button, {
  baseStyle: {
    width: '100%',
    maxWidth: '600px',
    height: '30px',
    borderRadius: '50px',
    marginTop: '40px',
    backgroundColor: '#C7C7C7',
    color: '#000',
    alignSelf: 'center',
    fontSize: ['14px', '16px', '18px'],
  },
});

/**
 *   프로필 저장 버튼 (ProfileSaveBtn)
 * - 프로필 설정 페이지 최하단에 위치하여, 입력된 정보를 저장
 * - 버튼 텍스트(value)와 클릭 이벤트 핸들러(onClick)를 props로 받아 유연하게 사용
 */
const ProfileSaveBtn = ({ value = '', onClick }) => {
  return <SaveBtn onClick={onClick}>{value}</SaveBtn>;
};

export default ProfileSaveBtn;
