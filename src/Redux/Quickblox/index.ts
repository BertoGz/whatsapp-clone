import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  qbInitialized: null,
  appSessionValid: null,
  userSessionValid: null,
  qbServiceFailure: false,
  chatConnected: false,
  webRtcConnected: false,
  chatListenersInit: false,
  qbSession: {},
} as {
  qbInitialized: boolean | null;
  appSessionValid: boolean | null;
  userSessionValid: boolean | null;
  qbServiceFailure: boolean;
  chatConnected: boolean;
  webRtcConnected: boolean;
  chatListenersInit: boolean;
  qbSession: any;
};
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
    setAppSessionValid: (state) => {
      state.appSessionValid = true;
    },
    setAppSessionInvalid: (state) => {
      state.appSessionValid = false;
    },
    setUserSessionValid: (state) => {
      state.userSessionValid = true;
    },
    setUserSessionInValid: (state) => {
      state.userSessionValid = false;
    },
    setQbServiceFailure: (state) => {
      state.qbServiceFailure = true;
    },
    setChatConnected: (state, action) => {
      state.chatConnected = action.payload;
    },
    setWebRtcConnected: (state, action) => {
      state.webRtcConnected = action.payload;
    },
    setChatListenersInit: (state) => {
      state.chatListenersInit = true;
    },
    setQbSession: (state, action) => {
      state.qbSession = action.payload
    },
    resetState: (state) => {
      state = initialState;
    },
  },
});
export const {
  setQbInitSuccess,
  setQbInitFailure,
  setAppSessionValid,
  setAppSessionInvalid,
  setUserSessionValid,
  setUserSessionInValid,
  setQbServiceFailure,
  setChatConnected,
  setWebRtcConnected,
  setChatListenersInit,
  setQbSession,
  resetState,
} = Quickblox.actions;
export default Quickblox.reducer;
