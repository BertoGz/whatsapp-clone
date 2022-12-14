import { useQuery } from "react-query";
import { clientData } from "..";
import { useAppSelector } from "../../Redux/useAppSelector";

export const useQueryContact = (id: number) => {
  const key = ["contacts", id];
  const chatConnected = useAppSelector(
    (state) => state.Quickblox.chatConnected
  );
  const query = useQuery<any, any, Array<TypeDataEntityContact> | null>(
    key,
    async () => {
      try {
        const contacts = clientData.getContacts();
        if (!contacts?.length) {
          return [];
        }
        const contact = contacts?.find((contact) => contact?.user?.id === id);
        return [contact];
      } catch (e) {}
    },
    {
      enabled: chatConnected && !!id,
      keepPreviousData: false,
      initialData: () => {
        const contacts = clientData.getContacts();
        if (!contacts?.length) {
          return;
        }
        const contact = contacts?.find((contact) => contact?.user?.id === id);
        return [contact];
      },
    }
  );
  return query;
};
