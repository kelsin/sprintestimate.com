import { createSlice } from "@reduxjs/toolkit";

export const errorsSlice = createSlice({
  name: "errors",
  initialState: [],
  reducers: {
    addError: (state, action) => [...state, action.payload],
    removeError: (state, action) => [
      ...state.slice(0, action.payload),
      ...state.slice(action.payload + 1),
    ],
  },
});

export const { addError, removeError } = errorsSlice.actions;
export default errorsSlice.reducer;
