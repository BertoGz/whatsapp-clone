import { useQuery } from "react-query";
import { clientData } from "..";
import { PromisedQb } from "../../Quickblox";
import { useAppSelector } from "../../Redux/useAppSelector";
import { getMyRelationshipsRequest } from "../../Requests";

export const useQueryContacts = (
  props: {
    status?: "pending" | "connected";
  } = { status: "connected" }
) => {
  let key = ["contacts"];
  if (props.status === "pending") {
    key = ["contacts", "pending"];
  }
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
        const { user_id } = (await PromisedQb.getSessionUser()) as any;
        const relationResponse = await getMyRelationshipsRequest({ user_id });
        const { data: relationships }: { data: Array<any> } =
          relationResponse || {};

        const friendRelationships = relationships.filter(
          (relationship: any) => {
            if (relationship.status === 1) {
              return true;
            }
            return false;
          }
        );

        // early return case
        if (friendRelationships?.length === 0) {
          return [];
        }
        const friendRelationshipsIds = friendRelationships.map(
          (relationship) => relationship.opponent_id
        );

        // debugger;
        const params = {
          page: 1,
          per_page: 1000,
          filter: {
            field: "id",
            param: "in",
            value: friendRelationshipsIds,
          },
        };
        // fetch contact data based on relationships query
        const contactData = await PromisedQb.listUsers(params);
        const { items }: { items: Array<any> } = contactData || {};
        let formattedContactData = items.map((item) => {
          const relationshipProps = relationships[item.id];
          if (relationshipProps) {
            return { ...item.user, friend: relationshipProps };
          }
          return item.user;
        });
        return { ...contactData, items: formattedContactData || [] };
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
