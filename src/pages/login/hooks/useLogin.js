import { useNavigate } from 'react-router-dom';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import {
  exLoginAtom,
  exProfileAtom,
  isLoginAtom,
  loginInputAtom,
  profileSavedAtom,
} from '../../../store/atoms';

const useLogin = () => {
  // 로그인 입력값 (아이디, 비밀번호) (읽기 및 수정 가능)
  const [loginInput, setLoginInput] = useAtom(loginInputAtom);
  // Mock 데이터 (읽기 전용)
  const mockLogin = useAtomValue(exLoginAtom);
  const mockLoginProfile = useAtomValue(exProfileAtom);
  // 전역 상태 업데이트 (로그인 여부, 프로필 저장) (업데이트 전용)
  // 컴포넌트의 불필요한 리렌더링을 방지하는 최적화 패턴
  const setIsLogin = useSetAtom(isLoginAtom);
  const setProfileSaved = useSetAtom(profileSavedAtom);

  const navigate = useNavigate();

  // 로그인 버튼 클릭 시 호출
  const handleChangeLogin = (loginInput) => {
    if (
      loginInput.id === mockLogin.id &&
      loginInput.password === mockLogin.password
    ) {
      setIsLogin(true);
      setProfileSaved(mockLoginProfile);
      navigate('/myBody');
    } else {
      alert('아이디 또는 비밀번호를 다시 입력하세요.');
      setLoginInput({ id: '', password: '' });
    }
  };

  // 로그인 없이 이용하기 버튼 클릭 시 호출
  const handleChangeMoveMain = () => {
    setIsLogin(false);
    setLoginInput({ id: '', password: '' });
    navigate('/');
  };

  // 키보드 엔터키 이벤트
  const handleChangeKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleChangeLogin(loginInput);
    }
  };

  return {
    loginInput,
    setLoginInput,

    handleChangeLogin,
    handleChangeMoveMain,
    handleChangeKeyDown,
  };
};
export default useLogin;
