import { useQuery } from "react-query";
import { clientData } from "..";

const key = "qbUserData";
export const useQueryQuickbloxUserData = () => {
  const query = useQuery(
    key,
    async () => {
      const userData = clientData.getQuickbloxUserData();
      return userData;
    },
    {
      initialData: () => {
        const userData = clientData.getQuickbloxUserData();
        return userData;
      },
    }
  );
  return query;
};
