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
  const query = useQuery<any, any, Array<TypeDataEntityContact | null>>(
    key,
    async () => {
      try {
        const { user_id } = (await PromisedQb.getSessionUser()) as any;
        const relationResponse = await getMyRelationshipsRequest();
        const {
          data: relationships,
        }: { data: Array<TypeDataEntityRelationship> } = relationResponse || {};

        const friendRelationships = relationships.filter((relationship) => {
          switch (props.status) {
            case "pending":
              if (relationship.status === 0) {
                return true;
              }
              break;
            case "connected":
              if (relationship.status === 1) {
                return true;
              }
              break;
          }

          return false;
        });
        debugger;
        // early return case
        if (friendRelationships?.length === 0) {
          return [];
        }
        const friendRelationshipsIds = friendRelationships.map(
          (relationship) => relationship.user_id
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
        const { items } = contactData || {};
        let formattedContactData = items.map((item) => {
          const relationshipProps = relationships.find(
            (relationship) => relationship.user_id === item.user.id
          );

          if (relationshipProps) {
            return { ...item.user, relationship: relationshipProps };
          }
          return item.user;
        });
        debugger;
        return formattedContactData || [];
      } catch (e) {}
    },
    {
      enabled: chatConnected,
      keepPreviousData: true,
      initialData: () => {
        const contacts = clientData.getContacts();
        if (!contacts?.length) {
          return [];
        }
        // debugger;
        return contacts.filter((contact) => {
          switch (props.status) {
            case "pending":
              if (contact.relationship.status === 0) {
                debugger;
                return true;
              }
              break;
            case "connected":
              if (contact.relationship.status === 1) {
                return true;
              }
              break;
          }
          return false;
        });
        //  return data;
      },
    }
  );
  return query;
};
