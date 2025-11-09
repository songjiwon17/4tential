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
