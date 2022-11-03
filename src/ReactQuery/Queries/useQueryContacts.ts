import { useQuery } from "react-query";
import { clientData } from "..";
import { PromisedQb } from "../../Quickblox";
import { useAppSelector } from "../../Redux/useAppSelector";
const key = "contacts";
export const useQueryContacts = () => {
  const chatConnected = useAppSelector(
    (state) => state.Quickblox.chatConnected
  );
  const query = useQuery(
    key,
    async () => {
      try {
        const contacts = await PromisedQb.getRoster();
        // debugger;
        const contactKeys = Object.keys(contacts).map((key) =>
          parseInt(key, 10)
        );
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
        //ebugger;
        return contactData || [];
      } catch (e) {}
    },
    {
      enabled: chatConnected,
      keepPreviousData: true,
    }
  );
  return query;
};
