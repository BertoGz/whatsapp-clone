import { configureStore } from "@reduxjs/toolkit";
import AppState from "./AppState";
export const store = configureStore({ reducer: { AppState } });

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
