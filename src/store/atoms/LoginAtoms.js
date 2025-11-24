import { atom } from 'jotai';
import { ProfileTypes } from './ProfileAtoms';

export const exLoginAtom = atom({
  id: '4tential',
  password: '1111',
});

export const loginInputAtom = atom({
  id: '',
  password: '',
});

export const isLoginAtom = atom(false);

export const exProfileAtom = atom({
  type: ProfileTypes.IncreasedStrength,
  name: '김운동',
  weight: '80',
  height: '175',
  muscle: '30',
  bodyFat: '28',
});
