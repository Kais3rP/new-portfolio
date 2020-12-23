import { createSlice } from '@reduxjs/toolkit';

export const mainSlice = createSlice({
  name: 'main',
  initialState: {
    isActive: false,
    isMuted: false
  },
  reducers: {
   setIsActive: (state, action) => {
     state.isActive = action.payload
   },
   toggleAudio: state => {
state.isMuted = !state.isMuted
   }
  },
});

export const { setIsActive, toggleAudio } = mainSlice.actions;

export const incrementAsync = amount => dispatch => {
  setTimeout(() => {
    //dispatch(incrementByAmount(amount));
  }, 1000);
};


export const selectCount = state => state.main.value;

export default mainSlice.reducer;
