import { useState } from 'react';
import { foodData } from '../mock/mockFood';

const useFood = () => {
  const [selectedFood, setSelectedFood] = useState('');
  const [nutrition, setNutrition] = useState(null);

  // 음식 버튼이나 검색을 했을 때 음식 정보 제공 이벤트 처리
  const handleRecommend = (foodName) => {
    const data = foodData[foodName];
    if (data) {
      setSelectedFood(foodName);
      setNutrition(data);
    } else {
      setSelectedFood('');
      setNutrition(null);
    }
  };

  // 검색 시 이벤트 처리
  const handleSearch = (inputValue) => {
    const searchTerm = inputValue.replace(/\s/g, '');
    handleRecommend(searchTerm);
  };

  return {
    selectedFood,
    nutrition,
    handleSearch,
    handleRecommend,
  };
};

export default useFood;
