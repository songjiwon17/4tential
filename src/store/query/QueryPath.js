import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import mockMotivateMessages from '../../layout/MainLayout/Main/mocks/mockMotivateMessages';

/**
 * [React Query] 서버 데이터 관리 훅 (Query Hooks)
 * - 외부 API나 비동기 데이터를 가져오는 로직을 커스텀 훅으로 분리하여 관리
 * - TanStack Query(React Query)를 사용하여 데이터 캐싱, 로딩 상태, 에러 처리를 효율적으로 수행
 */

// 명언 api 이용하여 명언 가져오는 useMainMessage
// 시연 영상 촬영을 위해 현재는 주석 처리하고 Mock 데이터를 사용 중

// export const useMainMessage = () => {
//   return useQuery(['mainMessage'], async () => {
//     const res = await axios.get(
//       'https://korean-advice-open-api.vercel.app/api/advice'
//     );
//     return res.data.message;
//   });
// };

// 시연 영상 위한 명언 mockMotivateMessages
export const useMainMessage = () => {
  return useQuery(['mainMessage'], () => {
    const randomMessageIndex = Math.floor(
      Math.random() * mockMotivateMessages.length
    );
    const randomMessageData = mockMotivateMessages[randomMessageIndex];

    return randomMessageData.message;
  });
};

// 식단 정보 api 이용하여 식단 정보 가져오는 useFoodMessage
export const useFoodMessage = (foodName) => {
  return useQuery({
    queryKey: ['foodData', foodName], // 자동 감지, foodName이 변경되면 서버에 요청. 서버에서 데이터를 가져오면 캐시에 저장. 이전에 요청한 데이터를 다시 요청하면 캐시에서 데이터를 가져옴.
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:4000/api/food?foodName=${encodeURIComponent(
          foodName
        )}`, // 서버에 데이터 요청.
        {
          timeout: 10000, // 10초 지나면 요청 취소.
        }
      );
      if (!res.data) {
        return null; // 만약 데이터가 비어있으면 null 반환.
      }
      return {
        name: res.data.FOOD_NM_KR, // 음식명
        kcal: res.data.AMT_NUM1, // 칼로리 (kcal)
        protein: res.data.AMT_NUM3, // 단백질 (g)
        fat: res.data.AMT_NUM4, // 지방 (g)
        carbs: res.data.AMT_NUM6, // 탄수화물 (g)
      };
    },
    enabled: !!foodName, // 검색어가 지금 있는지 확인하는 코드. foodName이 있으면 true, 없으면 false.
  });
};
