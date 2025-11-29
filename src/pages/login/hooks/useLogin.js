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
  const [loginInput, setLoginInput] = useAtom(loginInputAtom);
  const mockLogin = useAtomValue(exLoginAtom);
  const mockLoginProfile = useAtomValue(exProfileAtom);

  const setIsLogin = useSetAtom(isLoginAtom);
  const setProfileSaved = useSetAtom(profileSavedAtom);

  const navigate = useNavigate();

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

  const handleChangeMoveMain = () => {
    setIsLogin(false);
    setLoginInput({ id: '', password: '' });
    navigate('/');
  };

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
