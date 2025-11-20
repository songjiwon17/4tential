import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

// 명언 api 이용하여 명언 가져오는 useMainMessage
export const useMainMessage = () => {
  return useQuery(['mainMessage'], async () => {
    const res = await axios.get(
      'https://korean-advice-open-api.vercel.app/api/advice'
    );
    return res.data.message;
  });
};

// 식단 정보 api 이용하여 식단 정보 가져오는 useFoodMessage
export const useFoodMessage = (foodName) => {
  return useQuery({
    queryKey: ['foodData', foodName],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:4000/api/food?foodName=${encodeURIComponent(
          foodName
        )}`,
        {
          timeout: 10000, // ★ 추가: 10초 지나면 요청 취소
        }
      );
      if (!res.data) {
        return null;
      }
      return {
        name: res.data.FOOD_NM_KR,
        kcal: res.data.AMT_NUM1,
        protein: res.data.AMT_NUM3,
        fat: res.data.AMT_NUM4,
        carbs: res.data.AMT_NUM6,
        size: res.data.SERVING_SIZE,
      };
    },
    enabled: !!foodName,
  });
};
