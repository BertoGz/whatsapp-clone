import { useMutation } from "react-query";
import { PromisedQb } from "../../Quickblox";

type errorTypes = {};

async function acceptRequestFn(id: number) {
  return await PromisedQb.confirmAddRoster(id)
    .then((res) => {
      debugger;
      return Promise.resolve(res);
    })
    .catch((e) => {
      return Promise.reject(e);
    });
}

export const useMutationAcceptRequest = () => {
  return useMutation<any, errorTypes, number>(acceptRequestFn);
};
