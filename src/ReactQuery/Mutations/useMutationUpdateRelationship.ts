import { useMutation } from "react-query";
import { queryClient } from "..";
import { updateRelationship } from "../../Requests";

type errorTypes = {};
// -1 dev delete
// 0 pending
// 1 accepted
// 2 reject
// 3 block
type TypeParams = {
  relationship_id?: number;
  status?: -1 | 0 | 1 | 2 | 3;
};
async function updateRelationshipFn(props: TypeParams) {
  return await updateRelationship({
    relationship_id: props.relationship_id,
    status: props.status,
  })
    .then((res) => {
      return Promise.resolve(res);
    })
    .catch((e) => {
      return Promise.reject(e);
    });
}
export const useMutationUpdateRelationship = () => {
  return useMutation<any, errorTypes, TypeParams>(updateRelationshipFn, {
    onSuccess: () => {
      queryClient.invalidateQueries(["contacts"]);
      queryClient.invalidateQueries(["contacts", "pending"]);
      queryClient.refetchQueries({ queryKey: ["contacts"] });
      queryClient.refetchQueries({ queryKey: ["contacts", "pending"] });
    },
  });
};
