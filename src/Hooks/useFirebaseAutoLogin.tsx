import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMutationLoginUser } from "../ReactQuery";
import { FirebaseActions } from "../Firebase";
import { getAuth } from "firebase/auth";
const auth = getAuth();
export const useFirebaseAutoLogin = () => {
  const { mutateAsync: loginMutation } = useMutationLoginUser();
  const navigate = useNavigate();
  function onAutoLogin(isEmailLinkSignin = false) {
    loginMutation(
      {
        isEmailLinkSignin,
      },
      {
        onSuccess: () => {
          navigate("user");
        },
      }
    );
  }

  useEffect(() => {
    const isSignInWithEmailLink = FirebaseActions.isSignInWithEmailLink();
    auth.onAuthStateChanged((user) => {
      if (user && !isSignInWithEmailLink) {
        onAutoLogin();
      }
    });

    if (isSignInWithEmailLink) {
      onAutoLogin(isSignInWithEmailLink);
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <></>;
};
