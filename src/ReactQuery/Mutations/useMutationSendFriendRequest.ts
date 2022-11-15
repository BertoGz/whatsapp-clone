import { useMutation } from "react-query";
import { queryClient } from "..";
import { PromisedQb } from "../../Quickblox";
import {
  createRelationshipRequest,
  getQuickbloxUserByEmailRequest,
} from "../../Requests";

type errorTypes = {};

async function sendFriendRequestFn(email: string) {
  const responseOpponent = (await getQuickbloxUserByEmailRequest({ email })
    .then((res) => res)
    .catch(function (error) {
      debugger;
      console.log(error);
      // return Promise.reject(error);
    })) as any;
  if (responseOpponent) {
    const { id } = responseOpponent?.user || {};
    const { user_id: initiator_id } = PromisedQb.getSessionUser() || {};
    return await createRelationshipRequest({ initiator_id, opponent_id: id })
      .then((res) => {
        queryClient.invalidateQueries("contacts");
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
