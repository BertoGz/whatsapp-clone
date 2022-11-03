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
};
type errorTypes =
  | typeof loginUserErrorStates.null
  | typeof loginUserErrorStates.networkError
  | typeof loginUserErrorStates.incorrectCredentials;

async function loginUserFn(loginParams: TypeParamsUserLogin) {
  let response;
  const user = await FirebaseActions.getCurrentUser(); //window.localStorage.getItem("accessToken");
  debugger
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
    debugger
    return Promise.resolve(response.data);
  } else {
    const { code } = response.data;
    if (code === "asd") {
      // alert("Incorrect login credentials");
      return Promise.reject(response.data);
    } else {
      //   alert("Network error. Try again later.");
      return Promise.reject(response.data);
    }
  }
}
export const useMutationLoginUser = () => {
  return useMutation<any, errorTypes, TypeParamsUserLogin>(loginUserFn);
};
