import { useMutation } from "react-query";
import { queryClient } from "..";
import { FirebaseActions } from "../../Firebase";

type errorTypes = {};

async function logoutFn() {
  await FirebaseActions.signOutUser();
  queryClient.removeQueries();
  return Promise.resolve(1);
}

export const useMutationLogout = () => {
  return useMutation<any, errorTypes, null>(logoutFn);
};
