import { atom } from 'jotai';

export const ProfileTypes = {
  Diet: '다이어트',
  BoostPhysical: '체력향상',
  IncreasedStrength: '근력향상',
  BodyShapeCorrection: '체형교정',
};

export const profileTypeAtom = atom(ProfileTypes.Diet);

export const ProfileDetailTypes = {
  name: '',
  weight: '',
  height: '',
  muscle: '',
  bodyFat: '',
};

export const profileDetailLabelKey = {
  name: '이름',
  weight: '체중',
  height: '키',
  muscle: '근육량',
  bodyFat: '체지방량',
};

export const profileDetailTypeAtom = atom({
  name: '',
  weight: '',
  height: '',
  muscle: '',
  bodyFat: '',
});
