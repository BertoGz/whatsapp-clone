import * as QB from "quickblox/quickblox";
import { useEffect } from "react";
import { PromisedQb } from ".";
import { useQueryFirebaseUserData } from "../ReactQuery";
import {
  setAppSessionInvalid,
  setAppSessionValid,
  setQbInitSuccess,
  setUserSessionInValid,
  setUserSessionValid,
} from "../Redux/Quickblox";
import { useAppDispatch } from "../Redux/useAppDispatch";
import { useAppSelector } from "../Redux/useAppSelector";
var APPLICATION_ID = 98550;
var AUTH_KEY = "rPQMBraVeQN6Gpd";
var AUTH_SECRET = "gFYev7gKMzmAAcG";
var ACCOUNT_KEY = "ub3Nry9YQWQHnWQqLKez";
var CONFIG = { debug: false };

export const useQbSession = () => {
  const { data: userData } = useQueryFirebaseUserData();
  const { email, uid } = userData || {};
  const { qbInitialized, appSessionValid, userSessionValid } = useAppSelector(
    (state) => state.Quickblox
  );
  const dispatch = useAppDispatch();
  async function tryQbInit() {
    await QB.init(APPLICATION_ID, AUTH_KEY, AUTH_SECRET, ACCOUNT_KEY, CONFIG);
    dispatch(setQbInitSuccess());
  }
  async function tryCreateAppSession() {
    await PromisedQb.createSession()
      .then(() => {
        dispatch(setAppSessionValid());
      })
      .catch(() => {
        dispatch(setAppSessionInvalid());
      });

  }
  async function tryCreateUserSession() {
    // check if application session has been created
    const session = await PromisedQb.getSession();
    //debugger
    console.log("!!@@session", session);
    // early return if user session exists
    if (session?.application_id && session?.user_id !== 0 && session?.user_id) {
      dispatch(setUserSessionInValid());
      return;
    }
    if (
      session?.application_id &&
      (session?.user_id === 0 || !session?.user_id)
    ) {
      console.log("!!@@user has application session", session);
      const loginParams = { login: email, password: uid };

      let userExists = null;

      await PromisedQb.loginUser(loginParams)
        .then(() => {
          userExists = true;
          dispatch(setUserSessionValid());
        })
        .catch((err) => {
          const { code } = err || {};

          if (code === 401) {
            userExists = false;
          } else {
            dispatch(setUserSessionInValid());
          }
        });

      if (userExists === false) {
        const createParams = {
          login: email,
          email,
          password: uid,
          full_name: "QuickBlox Test",
        };

        const newUser = await PromisedQb.createUser(createParams);
        if (newUser) {
          await PromisedQb.loginUser(loginParams);
          dispatch(setUserSessionValid());
        }
      }
  
    }
  }
  useEffect(() => {
    if (qbInitialized === null && userData) {
      tryQbInit();
    }
  }, [qbInitialized, userData]);

  useEffect(() => {
    if (qbInitialized && !appSessionValid) {
      tryCreateAppSession();
    }
  }, [qbInitialized, appSessionValid]);

  useEffect(() => {
    if (appSessionValid && !userSessionValid) {
    //  debugger
      tryCreateUserSession();
    }
  }, [appSessionValid, userSessionValid]);
};
