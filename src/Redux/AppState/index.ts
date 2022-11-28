import { createSlice } from "@reduxjs/toolkit";
const initialState = { selectedProfile: 0, isLoggedOn: false };
export const AppState = createSlice({
  name: "appState",
  initialState,
  reducers: {
    setSelectedProfile: (state, action) => {
      state.selectedProfile = action.payload;
    },
    setIsLoggedOn: (state, action) => {
      state.isLoggedOn = action.payload;
    },
    resetState: (state) => {
      state.selectedProfile = initialState.selectedProfile;
    },
  },
});

export const { setSelectedProfile, setIsLoggedOn, resetState } =
  AppState.actions;
export default AppState.reducer;
