import { createSlice } from "@reduxjs/toolkit";

export const sessionSlice = createSlice({
  name: "session",
  initialState: {
    id: null,
    created: null,
    creator: null,
    users: {},
    current: null,
    past: [],
  },
  reducers: {
    sessionCreated: (state, action) => ({ ...state, ...action.payload }),
    updateSession: (state, action) => ({ ...state, ...action.payload }),
  },
});

export const { sessionCreated, updateSession } = sessionSlice.actions;
export default sessionSlice.reducer;
