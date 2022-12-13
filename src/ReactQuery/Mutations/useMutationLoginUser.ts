import { useMutation } from "react-query";
import { queryClient } from "..";
import { FirebaseActions } from "../../Firebase";
type TypeParamsUserLogin = {
  isEmailLinkSignin: boolean;
  email?: string;
  password?: string;
};
export const loginUserErrorStates = {
  null: null,
  networkError: "network-error",
  incorrectCredentials: "incorrectCredentials",
  userNotFound: "auth/user-not-found",
};
type errorTypes =
  | typeof loginUserErrorStates.null
  | typeof loginUserErrorStates.networkError
  | typeof loginUserErrorStates.incorrectCredentials
  | typeof loginUserErrorStates.userNotFound;

async function loginUserFn(loginParams: TypeParamsUserLogin) {
  let response;
  const user = await FirebaseActions.getCurrentUser(); //window.localStorage.getItem("accessToken");
  if (loginParams.isEmailLinkSignin) {
    response = await FirebaseActions.signInWithEmailLink();
  } else if (user) {
    response = { data: user, status: 1 }; //await FirebaseActions.signInWithCustomToken(hasAccessToken);
  } else if (loginParams?.email && loginParams?.password) {
    response = await FirebaseActions.signInUser(
      loginParams.email,
      loginParams.password
    );
  } else {
    return Promise.reject(loginUserErrorStates.networkError);
  }
  // early exit if no data or status
  if (!response?.data && !response?.status) {
    return;
  }
  if (response.status === 1) {
    queryClient.setQueryData("firebaseUserData", response.data);
    //debugger
    return Promise.resolve(response.data);
  } else {
    const { code } = response.data;
    if (code === loginUserErrorStates.userNotFound) {
      // alert("Incorrect login credentials");
      return Promise.reject(loginUserErrorStates.userNotFound);
    } else {
      //   alert("Network error. Try again later.");
      return Promise.reject(code);
    }
  }
}
export const useMutationLoginUser = () => {
  return useMutation<any, errorTypes, TypeParamsUserLogin>(loginUserFn);
};
