import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  qbInitialized: null,
} as { qbInitialized: boolean | null };
const Quickblox = createSlice({
  name: "quickblox",
  initialState,
  reducers: {
    setQbInitSuccess: (state) => {
      state.qbInitialized = true;
    },
    setQbInitFailure: (state) => {
      state.qbInitialized = false;
    },
    resetState: (state) => {
      state = initialState;
    },
  },
});
export const { setQbInitSuccess, setQbInitFailure, resetState } =
  Quickblox.actions;
export default Quickblox.reducer;
