import moment from "moment";
import { useEffect } from "react";
import { connectChat, InitQbChatListeners, PromisedQb } from ".";
import { useQueryFirebaseUserData } from "../ReactQuery";
import { setChatListenersInit, setQbServiceFailure } from "../Redux/Quickblox";
import { useAppDispatch } from "../Redux/useAppDispatch";
import { useAppSelector } from "../Redux/useAppSelector";
let chatConnectRetry = 0;
let totalChatConnects = 0;

// when we successfully connect to QB, record the time
let lastSuccessfulConnectTime = null;
// max retry count before we throw an error
const CHAT_CONNECT_RETRY_MAX = 3;

// max amount of times user can connect to chat within a minute
const TOTAL_CONNECTS_WITHIN_A_MINUTE = 10;

export const useQbChat = () => {
  const { data: firebaseUserData } = useQueryFirebaseUserData();
  const { uid } = firebaseUserData || {};
  // const jid = QB.chat.helpers.getUserJid(user.id, 24325);
  //const { data: qbUserData } = useQueryQuickbloxUserData();
  //const { userId } = qbUserData || {};
  //console.log("!!@@uid", uid);
  const dispatch = useAppDispatch();
  const {
    userSessionValid,
    chatConnected,
    qbServiceFailure,
    chatListenersInit,
  } = useAppSelector((state) => state.Quickblox);
  /**
   * @description init chat
   * will try to connet to quickblox chat.
   * after a total of 3 retries trigger service failure state
   */

  async function tryConnectChat() {
    // debugger
    if (qbServiceFailure || chatConnected) {
      return;
    }
    if (chatConnectRetry > CHAT_CONNECT_RETRY_MAX) {
      dispatch(setQbServiceFailure());
      //  debugger
      return;
    }
    const userSession = await PromisedQb.getSession();
    const { user_id: userId } = userSession || {};

    const credentials = { userId, password: uid };

    connectChat(credentials)
      .then(() => {
        // The is a condition to prevent a infinte loop to connect.
        const timeDiff = moment(Date.now()).diff(
          lastSuccessfulConnectTime,
          "minutes"
        );
        if (timeDiff < 1) {
          if (totalChatConnects > TOTAL_CONNECTS_WITHIN_A_MINUTE) {
            dispatch(setQbServiceFailure());
            return;
          }
        } else {
          // reset the lastConnectTime since a minute passed
          lastSuccessfulConnectTime = moment.now();
          totalChatConnects = 0;
        }
        // reset retry
        chatConnectRetry = 0;
        // increment total connects
        totalChatConnects += 1;
      })
      .catch(() => {
        chatConnectRetry += 1;
      });
  }

  useEffect(() => {
    if (userSessionValid && !chatListenersInit) {
      InitQbChatListeners();
      dispatch(setChatListenersInit());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userSessionValid, chatListenersInit]);
  useEffect(() => {
    if (userSessionValid && !chatConnected) {
      tryConnectChat();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userSessionValid, chatConnected]);
  return <></>;
};
