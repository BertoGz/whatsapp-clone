import { useMutation } from "react-query";

import { FirebaseActions } from "../../Firebase";

type TypeParamsUpdateProfileParams = {
  displayName: string;
};
export const useMutationUpdateProfile = () => {
  async function updateProfileFn(
    updateProfileParams: TypeParamsUpdateProfileParams
  ) {
    const response = await FirebaseActions.updateProfile({
      displayName: updateProfileParams.displayName,
    });
    console.log("response send message", response);
    debugger;
  }
  return useMutation<any, any, TypeParamsUpdateProfileParams>(updateProfileFn, {
    onSuccess: () => {},
  });
};
