import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/app/types.ts';

export interface InitialStateType {
  user: Pick<User, 'id'> | null;
}

const initialState: InitialStateType = {
  user: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Pick<User, 'id'> | null>) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = profileSlice.actions;
export default profileSlice.reducer;
