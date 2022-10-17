import * as QB from "quickblox/quickblox";
import { useEffect } from "react";
import { PromisedQb } from ".";
import { setQbInitFailure, setQbInitSuccess } from "../Redux/Quickblox";
import { useAppDispatch } from "../Redux/useAppDispatch";
import { useAppSelector } from "../Redux/useAppSelector";
var APPLICATION_ID = 98550;
var AUTH_KEY = "rPQMBraVeQN6Gpd";
var AUTH_SECRET = "gFYev7gKMzmAAcG";
var ACCOUNT_KEY = "ub3Nry9YQWQHnWQqLKez";
var CONFIG = { debug: true };

export const useQbSession = () => {
  const { qbInitialized } = useAppSelector((state) => state.Quickblox);
  const dispatch = useAppDispatch();
  async function tryQbInit() {
    await QB.init(APPLICATION_ID, AUTH_KEY, AUTH_SECRET, ACCOUNT_KEY, CONFIG);
    //create app session
    await PromisedQb.createSession()
      .then(() => {
        dispatch(setQbInitSuccess());
      })
      .catch(() => {
        dispatch(setQbInitFailure());
      });
  }
  async function tryCreateUserSession() {
    // check if application session has been created
    const session = await PromisedQb.getSession();
    console.log("hasSession", session);
    if (session?.application_id){
        const params = {}
        const userSession = PromisedQb.createSession(params)
    }
  }
  useEffect(() => {
    if (qbInitialized === null) {
      tryQbInit();
    }
  }, [qbInitialized]);

  useEffect(() => {
    if (qbInitialized) {
      tryCreateUserSession();
    }
  }, [qbInitialized]);
};
