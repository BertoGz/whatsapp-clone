import { createSlice } from "@reduxjs/toolkit";
const initialState = { selectedProfile: 0 };
export const AppState = createSlice({
  name: "appState",
  initialState,
  reducers: {
    setSelectedProfile: (state, action) => {
      state.selectedProfile = action.payload;
    },
  },
});

export const { setSelectedProfile } = AppState.actions;
export default AppState.reducer;
