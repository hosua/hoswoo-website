import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    darkMode: true,
  },
  reducers: {},
  extrareducers: {},
});
