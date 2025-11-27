import { useState } from 'react';

const useFood = () => {
  const [selectedFood, setSelectedFood] = useState(''); // 사용자 입력 또는 추천 버튼 클릭으로 선택된 음식명 저장

  // 음식 버튼을 눌렀을 때 음식 정보 제공 이벤트 처리
  const handleClickRecommend = (foodName) => {
    setSelectedFood(foodName);
  };

  // 검색 시 이벤트 처리, 사용자에게 전달받은 inputValue 값을 handleClickRecommend()에 전달
  const handleClickSearch = (inputValue) => {
    const searchTerm = inputValue.replace(/\s/g, '');
    handleClickRecommend(searchTerm);
  };

  return {
    selectedFood,
    handleClickSearch,
    handleClickRecommend,
  };
};

export default useFood;
