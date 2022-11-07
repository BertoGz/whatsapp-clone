import { useQuery } from "react-query";
import { clientData } from "..";
import { PromisedQb } from "../../Quickblox";
import { useAppSelector } from "../../Redux/useAppSelector";
const key = ["contacts"];
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
        const contacts = (await PromisedQb.getRoster()) as {
          [key: number]: { subscription: string; ask: string };
        };

        const friendContacts = Object.keys(contacts).filter((key: any) => {
          if (contacts[key].subscription === "both") {
            return true;
          }
          return false;
        });

        // early return case
        if (friendContacts?.length === 0) {
          return [];
        }
        const friendContactsInt = friendContacts.map((key) => {
          return parseInt(key, 10);
        });

        // debugger;
        const params = {
          page: 1,
          per_page: 1000,
          filter: {
            field: "id",
            param: "in",
            value: friendContactsInt,
          },
        };
        // find contact data based on connected users filter
        const contactData = await PromisedQb.listUsers(params);
        const { items }: { items: Array<any> } = contactData || {};
        let formattedData = items.map((item) => {
          const contactListProps = contacts[item.user.id];
          if (contactListProps) {
            return { ...item.user, friend: contactListProps };
          }
          return item.user;
        });
        return { ...contactData, items: formattedData || [] };
      } catch (e) {}
    },
    {
      enabled: chatConnected,
      keepPreviousData: true,
      initialData: () => {
        return clientData.getContacts();
      },
    }
  );
  return query;
};
