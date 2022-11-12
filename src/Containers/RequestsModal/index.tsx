import { Divider, Stack, Typography } from "@mui/material";
import ContactListItem from "../../Components/ContactListItem";
import { useQueryContacts } from "../../ReactQuery";
import { useMutationAcceptRequest } from "../../ReactQuery/Mutations/useMutationAcceptRequest";

export const RequestsModal = () => {
  const { data } = useQueryContacts({ status: "pending" });
  const { mutateAsync: acceptRequestMutation } = useMutationAcceptRequest();
  const { items: pendingUsers } = data || {};
  function onAccept(contact: TypeDataEntityContact) {
    acceptRequestMutation({
      relationship_id: contact.relationship.relationship_id,
      status: 1,
    });
  }

  return (
    <Stack direction={"column"}>
      <Stack p={5} direction={"column"}>
        <Typography fontWeight={"bold"}>Pending Invitations</Typography>
        <Divider />
        {pendingUsers &&
          pendingUsers.map((item) => (
            <ContactListItem {...{ item, variant: "request", onAccept }} />
          ))}
      </Stack>
    </Stack>
  );
};
