import { createSlice } from '@reduxjs/toolkit';

export const sessionSlice = createSlice({
  name: 'session',
  initialState: {},
  reducers: {
    sessionCreated: (state, action) => action.payload
  }
});

export const { sessionCreated } = sessionSlice.actions;
export default sessionSlice.reducer;
