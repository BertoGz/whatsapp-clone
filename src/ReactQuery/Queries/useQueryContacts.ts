import { useQuery } from "react-query";
import { clientData } from "..";
import { PromisedQb } from "../../Quickblox";
import { useAppSelector } from "../../Redux/useAppSelector";
const key = "contacts";
export const useQueryContacts = () => {
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
        const contacts = await PromisedQb.getRoster();

        const contactKeys = Object.keys(contacts).map((key) =>
          parseInt(key, 10)
        );
        if (contactKeys?.length === 0) {
          return [];
        }
        //const contactKeysJoined = contactKeys.join();
        const filter = { field: "id", param: "in", value: contactKeys };
        //field_type+field_name+operator+value'
        // debugger;
        const params = {
          page: 1,
          per_page: 1000,
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
      enabled: chatConnected,
      keepPreviousData: true,
    }
  );
  return query;
};
