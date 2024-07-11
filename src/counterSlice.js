import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'mediaArr',
  initialState: {
    value: [],
  },
  reducers: {
    updateArr: (state, payload) => {
      state.value = payload.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateArr } = counterSlice.actions;

export default counterSlice.reducer;
