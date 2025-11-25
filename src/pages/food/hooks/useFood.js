import { useState } from 'react';

const useFood = () => {
  const [selectedFood, setSelectedFood] = useState('');

  // 음식 버튼이나 검색을 했을 때 음식 정보 제공 이벤트 처리
  const handleClickRecommend = (foodName) => {
    setSelectedFood(foodName);
  };

  // 검색 시 이벤트 처리
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
