import { useQuery } from "react-query";
import { clientData, queryClient } from "..";
import { PromisedQb } from "../../Quickblox";
import { useAppSelector } from "../../Redux/useAppSelector";

export const useQueryContact = (id: number) => {
  const key = ["contacts", id];
  const chatConnected = useAppSelector(
    (state) => state.Quickblox.chatConnected
  );
  const query = useQuery<
    any,
    any,
    { items: Array<TypeDataEntityQbUser | null> }
  >(
    key,
    async () => {
      try {
        //const contactKeysJoined = contactKeys.join();
        const filter = { field: "id", param: "eq", value: id };
        //field_type+field_name+operator+value'
        // debugger;
        const params = {
          page: 1,
          per_page: 1,
          filter,
        };
        const contactData = await PromisedQb.listUsers(params);
        const { items }: { items: Array<any> } = contactData || {};
        let formattedData = items.map((item) => {
          return item.user;
        });
        return { ...contactData, items: formattedData || [] };
      } catch (e) {}
    },
    {
      enabled: chatConnected && !!id,
      keepPreviousData: true,
      initialData: () => {
        const users = clientData.getContacts();
        if (!users?.length) {
          return null;
        }
        return users.find((user) => user.id === id);
      },
    }
  );
  return query;
};
