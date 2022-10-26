import { useMutation } from "react-query";
import { queryClient } from "..";
import { FirebaseActions } from "../../Firebase";
import { getCustomToken } from "../../Requests";
type TypeParamsUserLogin = {
  isEmailLinkSignin: boolean;
  email: string;
  password: string;
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
  //window.localStorage.removeItem("accessToken");
  //window.localStorage.remoteItem("refreshToken")

  if (loginParams.isEmailLinkSignin) {
    response = await FirebaseActions.signInWithEmailLink();
  } else if (user) {
    response = { data: user, status: 1 }; //await FirebaseActions.signInWithCustomToken(hasAccessToken);
    debugger;
  } else if (loginParams?.email && loginParams?.password) {
    response = await FirebaseActions.signInUser(
      loginParams.email,
      loginParams.password
    );
    debugger;
  } else {
    return Promise.reject(loginUserErrorStates.networkError);
  }
  // early exit if no data or status
  if (!response?.data && !response?.status) {
    return;
  }
  if (response.status === 1) {
    debugger;
    //window.localStorage.setItem('userToken',response.data)
    //const token = await FirebaseActions.getIdToken(response.data);
    // const { uid } = response.data || {};
    //const { accessToken, refreshToken } = response?.data?.stsTokenManager || {};
    //window.localStorage.setItem("accessToken", accessToken);
    //window.localStorage.setItem("refreshToken", refreshToken);
    //const token = await getCustomToken(uid);
    //debugger;
    //if (token.status === 1) {
    ///  window.localStorage.setItem("userToken", token.data);
    //}
    queryClient.setQueryData("userData", response.data);
    return Promise.resolve(response.data);
  } else {
    const { code } = response.data;
    debugger;
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
