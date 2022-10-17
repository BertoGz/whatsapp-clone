import * as QB from "quickblox/quickblox";
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
};
