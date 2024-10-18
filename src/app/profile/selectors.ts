import { RootState } from '@/app/store.ts';

export const userSelector = (state: RootState) => state.profile.user;
