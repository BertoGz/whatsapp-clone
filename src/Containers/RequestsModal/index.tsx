import { Divider, Stack, Typography } from "@mui/material";
import { useMemo } from "react";
import ContactListItem from "../../Components/ContactListItem";
import PendingContactListItem from "../../Components/PendingContactListItem";
import { useQueryContacts } from "../../ReactQuery";
import { useMutationUpdateRelationship } from "../../ReactQuery";

export const RequestsModal = () => {
  const { data: pendingUsers } = useQueryContacts({ status: "pending" });
  const { mutateAsync: updateRelationshipMutation } =
    useMutationUpdateRelationship();
  function onAccept(contact: TypeDataEntityContact) {
    updateRelationshipMutation(
      {
        relationship_id: contact.relationship.relationship_id,
        status: 1,
      },
      { onSuccess: () => {} }
    );
  }
  const pendingUserRequests = useMemo(() => {
    if (!pendingUsers) {
      return [];
    }
    return pendingUsers.filter((user) => !user?.relationship.isInitiator);
  }, [pendingUsers]);
  return (
    <Stack direction={"column"}>
      <Stack p={5} direction={"column"}>
        <Typography fontWeight={"bold"}>Pending Invitations</Typography>
        <Divider />
        {pendingUserRequests &&
          pendingUserRequests.map((item) => {
            if (!item) {
              return <></>;
            }
            return (
              <PendingContactListItem
                {...{ item, variant: "request", onAccept }}
              />
            );
          })}
      </Stack>
    </Stack>
  );
};
