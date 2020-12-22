import { createSlice } from '@reduxjs/toolkit';

export const mainSlice = createSlice({
  name: 'main',
  initialState: {
    isActive: true,
  },
  reducers: {
   setIsActive: (state, action) => {
     state.isActive = action.payload
   }
  },
});

export const { increment, decrement, incrementByAmount } = mainSlice.actions;

export const incrementAsync = amount => dispatch => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount));
  }, 1000);
};


export const selectCount = state => state.main.value;

export default mainSlice.reducer;
