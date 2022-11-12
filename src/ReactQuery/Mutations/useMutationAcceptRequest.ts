import { useMutation } from "react-query";
import { queryClient } from "..";
import { PromisedQb } from "../../Quickblox";
import { updateRelationship } from "../../Requests";

type errorTypes = {};
type params = {
  relationship_id: number;
  status: 0 | 1 | 2 | 3;
};
async function acceptRequestFn({ relationship_id, status }: params) {
  return await updateRelationship({ relationship_id, status })
    .then((res) => {
      return Promise.resolve(res);
    })
    .catch((e) => {
      debugger;
      return Promise.reject(e);
    });
}
const queryKey = ["contacts", "pending"];
export const useMutationAcceptRequest = () => {
  return useMutation<any, errorTypes, params>(acceptRequestFn, {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey);
    },
  });
};
