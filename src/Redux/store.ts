import { configureStore } from "@reduxjs/toolkit";
import AppState from "./AppState";
import Quickblox from "./Quickblox";
export const store = configureStore({ reducer: { AppState, Quickblox } });

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
