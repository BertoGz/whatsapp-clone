import { useQuery } from "react-query";
import { clientData } from "..";

const key = "userData";
export const useQueryUserData = () => {
  const query = useQuery(
    key,
    async () => {
      const userData = clientData.getUserData();
      return userData;
    },
    {
      initialData: () => {
        const userData = clientData.getUserData();
        return userData;
      },
    }
  );
  return query;
};
