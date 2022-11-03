import * as QB from "quickblox/quickblox";
import { setChatConnected } from "../Redux/Quickblox";
import { store } from "../Redux/store";
export const PromisedQb = {
  getSession: async () => {
    return new Promise((res, rej) => {
      return QB.getSession((error, sesh) => {
        if (error) {
          rej(error);
        }
        res(sesh.session);
      });
    });
  },
  createSession: async (params = {}) => {
    return new Promise((res, rej) => {
      return QB.createSession(params, (error, sesh) => {
        if (error) {
          rej(error);
        }
        res(sesh.session);
      });
    });
  },
  createUser: async (params = {}) => {
    return new Promise((res, rej) => {
      return QB.users.create(params, function (error, sesh) {
        if (error) {
          // debugger;
          rej(error);
          //done.fail("Create user error: " + JSON.stringify(error));
        } else {
          //  debugger;
          res(sesh);
        }
      });
    });
  },
  loginUser: async (params = {}) => {
    // debugger;
    return new Promise((res, rej) => {
      return QB.login(params, (error, sesh) => {
        if (error) {
          //  debugger;
          rej(error);
        } else {
          //  debugger;
          res(sesh);
        }
      });
    });
  },
  chatConnect: async (params = {}) => {
    return new Promise((res, rej) => {
      return QB.chat.connect(params, (error, sesh) => {
        if (error) {
          //  debugger;
          rej(error);
        } else {
          // debugger
          res(sesh);
        }
      });
    });
  },
  chatDisconnect: async () => {
    return QB.chat.disconnect();
  },
  getRoster: async () => {
    return new Promise(async (res, rej) => {
      try {
        await QB.chat.roster.get((contactList) => {
          console.log("contactList");
          res(contactList);
        });
      } catch (e) {
        if (e.name === "ChatNotConnectedError") {
          // not connected to chat
        }
        rej(e);
      }
    });
  },
  addToRoster: async (userId) => {
    return new Promise(async (res, rej) => {
      try {
        QB.chat.roster.add(userId, (data) => {
          debugger;
          res(data);
        });
      } catch (e) {
        if (e.name === "ChatNotConnectedError") {
          // not connected to chat
        }
        rej(e);
      }
    });
  },
  listUsers: async (params) => {
    return new Promise((res, rej) => {
      return QB.users.listUsers(params, (error, response) => {
        if (error) {
          console.log(error);
          debugger
          rej(error);
        } else {
          console.log(response);
          debugger
          res(response);
        }
      });
    });
  },
};
export const QbHelpers = {
  //getUserJid: () => QB.chat.helpers.getUserJid(user.id, 24325),
};
export const connectChat = async (userCredentials = {}) => {
  //await PromisedQb.chatConnect(userCredentials);
  const isChatConnected = store.getState().Quickblox.chatConnected;
  try {
    if (!isChatConnected) {
      await PromisedQb.chatConnect(userCredentials)
        .then(() => {
          store.dispatch(setChatConnected(true));
          return Promise.resolve();
        })
        .catch((e) => {
          throw e;
        });
    }
    //await store.dispatch(setupQuickbloxChatAction());
    //await store.dispatch(setChatStatus(true));
    //console.debug("connectChat: ", "Connected to chat");
  } catch (e) {
    console.error("![ERR] Quickblox - connectChat: ", e.message);
    /*store.dispatch(
      handleChatStatusError(
        e.message === "You have already logged in chat" ||
          e.message?.startsWith("You shouldn")
      )
    );*/
    return Promise.reject(e); // e.message === 'You have already logged in chat' || e.message?.startsWith('You shouldn');
  }
};

/*export const Listeners = {
  onReconnectListener: () => QB.chat.onReconnectListener,
  onDisconnectedListener: () => QB.chat.onDisconnectedListener,
  onLastUserActivityListener: () => QB.chat.onLastUserActivityListener,
  onRejectSubscribeListener: () => QB.chat.onRejectSubscribeListener,
  onConfirmSubscribeListener: () => QB.chat.onConfirmSubscribeListener,
  onSubscribeListener: () => QB.chat.onSubscribeListener,
  onContactListListener: () => QB.chat.onContactListListener,
  onLeaveOccupant: () => QB.chat.onLeaveOccupant,
  onJoinOccupant: () => QB.chat.onJoinOccupant,
  onKickOccupant: () => QB.chat.onKickOccupant,
  onSystemMessageListener: () => QB.chat.onSystemMessageListener,
  onReadStatusListener: () => QB.chat.onReadStatusListener,
  onDeliveredStatusListener: () => QB.chat.onDeliveredStatusListener,
  onMessageTypingListener: () => QB.chat.onMessageTypingListener,
  onSentMessageCallback: () => QB.chat.onSentMessageCallback,
  onMessageErrorListener: () => QB.chat.onMessageErrorListener,
  onMessageListener: () => QB.chat.onMessageListener,
};*/

function onReconnectListener(msg) {
  console.log("##onReconnect");
}
function onDisconnectedListener(msg) {
  const dispatch = store.dispatch;
  console.log("##onDisconnect");
  dispatch(setChatConnected(false));
}
function onSubscribeListener(msg) {
  console.log("##onSubscribe");
}
function onConfirmSubscribeListener() {
  console.log("##onConfirmSubscribeListener");
}

/*QB.chat.onReconnectListener = onReconnectListener;
QB.chat.onDisconnectedListener = onDisconnectedListener;
QB.chat.onSubscribeListener = onSubscribeListener;
QB.chat.onConfirmSubscribeListener = onConfirmSubscribeListener*/
/*QB.chat.addListener(QB.chat.onSubscribeListener)
QB.chat.addListener(QB.chat.onReconnectListener)
QB.chat.addListener(QB.chat.onConfirmSubscribeListener)*/

//QB.chat.chatConnectedListener = chatConnectedListener

export function InitQbChatListeners() {
  QB.chat.onReconnectListener = onReconnectListener;
  QB.chat.onDisconnectedListener = onDisconnectedListener;
  QB.chat.onSubscribeListener = onSubscribeListener;
  QB.chat.onConfirmSubscribeListener = onConfirmSubscribeListener;
  /* QB.chat.onReconnectListener = onReconnectListener;
  QB.chat.onDisconnectedListener = onDisconnectedListener;
  QB.chat.onSubscribeListener = onSubscribeListener;
  QB.chat.chatConnectedListener = chatConnectedListener*/
}
