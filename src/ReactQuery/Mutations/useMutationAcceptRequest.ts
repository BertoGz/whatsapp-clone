import { useMutation } from "react-query";
import { queryClient } from "..";
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
const queryKey = ["contacts", "pending"];
export const useMutationAcceptRequest = () => {
  return useMutation<any, errorTypes, number>(acceptRequestFn, {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey);
    },
  });
};
