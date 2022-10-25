import { useMutation } from "react-query";
import { queryClient } from "..";
import { FirebaseActions } from "../../Firebase";

type TypeParamsCreateUser = {
  email: string;
  password: string;
};
export const createUserErrorStates = {
  null: null,
  emailInUse: "auth/email-already-in-use",
  networkError: "network-error",
  weakPassword: "auth/weak-password",
  invalidEmail: "auth/invalid-email",
};
type errorTypes =
  | typeof createUserErrorStates.null
  | typeof createUserErrorStates.networkError
  | typeof createUserErrorStates.emailInUse
  | typeof createUserErrorStates.weakPassword
  | typeof createUserErrorStates.invalidEmail;

const createUserFn = async (loginParams: TypeParamsCreateUser) => {
  const response = await FirebaseActions.createUser(
    loginParams.email,
    loginParams.password
  );

  if (response.status === 1) {
    queryClient.setQueryData("userData", response.data);
    return Promise.resolve(response.data);
  } else {
    const { code } = response.data;
    if (code === createUserErrorStates.emailInUse) {
      return Promise.reject(createUserErrorStates.emailInUse);
    } else if (code === createUserErrorStates.weakPassword) {
      return Promise.reject(createUserErrorStates.weakPassword);
    } else if (code === createUserErrorStates.invalidEmail) {
      return Promise.reject(createUserErrorStates.invalidEmail);
    } else {
      return Promise.reject(createUserErrorStates.networkError);
    }
  }
};
export const useMutationCreateUser = () => {
  return useMutation<any, errorTypes, TypeParamsCreateUser>(createUserFn);
};
