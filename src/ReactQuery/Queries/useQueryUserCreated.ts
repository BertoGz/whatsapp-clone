import { useQuery } from "react-query";
import { clientData } from "..";

const key = "userCreated";
export const useQueryUserCreated = () => {
  const query = useQuery(
    key,
    async () => {
      const userData = clientData.getUserCreated();
      return userData;
    },
    {
      initialData: () => {
        const userData = clientData.getUserCreated();
        return userData;
      },
    }
  );
  return query;
};
