import { useQuery } from "react-query";
import { clientData } from "..";

const key = "firebaseUserData";
export const useQueryFirebaseUserData = () => {
  const query = useQuery(
    key,
    async () => {
      const userData = clientData.getFirebaseUserData();
      return userData;
    },
    {
      initialData: () => {
        return clientData.getFirebaseUserData();
      },
    }
  );
  return query;
};
