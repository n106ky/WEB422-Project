import { atom } from 'jotai';

//VIEWED HISTORY (TOGGLE)
export const viewedAtom = atom([]);
export const recentlyViewedAtom = atom([]);
// export const recentlyViewedAtom = atom((get) => get(viewedAtom).slice(-6));

//FAVOURITE LIST
export const favouriteAtom = atom([]);
