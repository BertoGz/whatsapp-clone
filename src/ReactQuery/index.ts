import { QueryClient } from "react-query";
import { User } from "firebase/auth";
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: Infinity,
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    },
  },
});
export * from "./Mutations/useMutationUpdateRelationship";
export * from "./Mutations/useMutationLoginUser";
export * from "./Mutations/useMutationCreateUser";
export * from "./Queries/useQueryFirebaseUserData";
export * from "./Queries/useQueryQuickbloxUserData";
export * from "./Queries/useQueryContacts";
export * from "./Queries/useQueryContact";
export const clientData = {
  getFirebaseUserData: () =>
    queryClient.getQueryData("firebaseUserData") as User | undefined,
  getQuickbloxUserData: () => queryClient.getQueryData("qbUserData") as any,
  getContacts: () => {
    const cache = queryClient.getQueryCache().findAll("contacts");
    let queryData = [] as Array<TypeDataEntityContact | undefined>;
    if (cache?.length) {
      cache.forEach((cache) => {
        const contacts = cache.state.data as Array<TypeDataEntityContact>;
        if (contacts?.length) {
          queryData = [...queryData, ...contacts];
        }
      });
      debugger;
    } else {
      return undefined;
    }

    return queryData;
  },
  getPendingContacts: () =>
    queryClient.getQueryData("pendingContacts") as
      | TypeDataEntityContact[]
      | undefined,
};
