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
  userIsTyping: JSON.stringify(new Map()),
} as {
  qbInitialized: boolean | null;
  appSessionValid: boolean | null;
  userSessionValid: boolean | null;
  qbServiceFailure: boolean;
  chatConnected: boolean;
  webRtcConnected: boolean;
  chatListenersInit: boolean;
  qbSession: any;
  userIsTyping: any;
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
      state.qbSession = action.payload;
    },
    setUserIsTyping: (state, action) => {
      const { userId, isTyping } = action.payload || {};
      debugger;
      const parsed = JSON.parse(state.userIsTyping);
      debugger;
      parsed[userId] = isTyping;
      const stringed = JSON.stringify(parsed);
      debugger;
      state.userIsTyping = stringed;
    },
    resetState: (state) => {
      state.qbInitialized = initialState.qbInitialized;
      state.chatConnected = initialState.chatConnected;
      state.userSessionValid = initialState.userSessionValid;
      state.appSessionValid = initialState.appSessionValid;
      state.qbServiceFailure = initialState.qbServiceFailure;
      state.chatListenersInit = initialState.chatListenersInit;
      state.webRtcConnected = initialState.webRtcConnected;
      //  debugger
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
  setUserIsTyping,
  resetState,
} = Quickblox.actions;
export default Quickblox.reducer;
