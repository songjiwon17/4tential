import { atom } from 'jotai';

export const MainPageTypes = {
  Profile: '프로필',
  MtBody: '나의 체형',
  WorkoutRecommend: '운동 추천',
  FoodSearch: '식단 검색',
};

export const mainPageTypeAtom = atom(MainPageTypes.Profile);
