import { useAtom } from 'jotai';
import { mainPageTypeAtom } from '../../../store/atoms/PageAtoms';

const usePage = () => {
  const [mainPageType, setMainPageType] = useAtom(mainPageTypeAtom);

  const handleChangePageType = (value) => {
    setMainPageType(value);
  };

  return {
    mainPageType,
    handleChangePageType,
  };
};

export default usePage;
