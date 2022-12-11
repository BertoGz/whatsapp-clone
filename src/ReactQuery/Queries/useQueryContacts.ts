import { useQuery } from "react-query";
import { clientData } from "..";
import { PromisedQb } from "../../Quickblox";
import { useAppSelector } from "../../Redux/useAppSelector";
import { getMyRelationshipsRequest } from "../../Requests";

const LIMIT = 1000; // fetching limit
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
        // early return case
        if (friendRelationships?.length === 0) {
          return [];
        }
        const friendRelationshipsIds = friendRelationships.map(
          (relationship) => relationship.user_id
        );

        const listUserParams = {
          page: 1,
          per_page: LIMIT,
          filter: {
            field: "id",
            param: "in",
            value: friendRelationshipsIds,
          },
        };
        // fetch contact data based on relationships query
        const contactData = await PromisedQb.listUsers(listUserParams);
        const { items: contactDataItems } = contactData || {};
        const dialogsParams = {
          limit: LIMIT,
        };
        const qbDialogs = await PromisedQb.dialogList(dialogsParams);
        const contactsPayload = () => {
          if (!contactDataItems?.length) {
            return undefined;
          }
          const returnPayload = [] as Array<
            | {
                user: TypeDataEntityQbUser;
                dialog: TypeDataEntityDialog | undefined;
                relationship: TypeDataEntityRelationship;
              }
            | undefined
          >;
          contactDataItems.forEach((contact) => {
            if (contact) {
              // attach relationship props
              const relationshipProps = relationships.find(
                (relationship) => relationship.user_id === contact.user.id
              );
              const findDialog = qbDialogs?.items?.find(
                (dialog) =>
                  dialog?.data?.relationship_id ===
                  relationshipProps?.relationship_id
              );
              if (relationshipProps) {
                returnPayload.push({
                  user: contact.user,
                  dialog: findDialog,
                  relationship: relationshipProps,
                });
              }
            }
          });

          return returnPayload;
        };
        return contactsPayload() || [];
      } catch (e) {}
    },
    {
      enabled: chatConnected,
      keepPreviousData: true,
      staleTime: 60000, // 1 min
    }
  );
  return query;
};
/**
 *  initialData: () => {
        const contacts = clientData.getContacts();
        if (!contacts?.length) {
          return;
        }
        return contacts?.filter((contact) => {
          switch (props.status) {
            case "pending":
              if (contact?.relationship.status === 0) {
                // debugger;
                return true;
              }
              break;
            case "connected":
              if (contact?.relationship.status === 1) {
                return true;
              }
              break;
          }
          return false;
        });
 */
