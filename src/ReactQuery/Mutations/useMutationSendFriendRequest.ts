import axios from "axios";
import { useMutation } from "react-query";
import { PromisedQb } from "../../Quickblox";

type errorTypes = {};

async function sendFriendRequestFn(email: string) {
  const session = await PromisedQb.getSession();
  const { token } = session || {};
  const getUserByEmailEndpoint = {
    method: "GET",
    url: "https://api.quickblox.com/users/by_email.json",
    params: { email },
    headers: { accept: "application/json", "QB-Token": token },
  };

  const response = (await axios
    .request(getUserByEmailEndpoint)
    .then((res) => {
      return res;
      // return Promise.resolve(res);
    })
    .catch(function (error) {
      debugger;
      console.log(error);
      // return Promise.reject(error);
    })) as any;
  debugger;
  if (response?.data) {
    const { id } = response?.data?.user || {};

    return await PromisedQb.addToRoster(id)
      .then((res) => {
        debugger;
        return Promise.resolve(res);
      })
      .catch((e) => {
        return Promise.reject(e);
      });
  }
  return Promise.reject("could not find user by that email");
}

export const useMutationSendFriendRequest = () => {
  return useMutation<any, errorTypes, string>(sendFriendRequestFn);
};
