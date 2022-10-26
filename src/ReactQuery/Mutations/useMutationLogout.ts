import { useMutation } from "react-query";
import { queryClient } from "..";
import { FirebaseActions } from "../../Firebase";

type errorTypes = {};

async function logoutFn() {
  const response = await FirebaseActions.signOutUser();
  queryClient.setQueryData("userData", null);
  return Promise.resolve(response);
}
export const useMutationLogout = () => {
  return useMutation<any, errorTypes, null>(logoutFn);
};
