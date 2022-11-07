import { Divider, Stack, Typography } from "@mui/material";
import { useQueryPendingContacts } from "../../ReactQuery/Queries/useQueryPendingContacts";

const PendingContact = ({ contact }: { contact: TypeDataEntityContact }) => {
  return <Typography></Typography>;
};

export const RequestsModal = () => {
  const { data } = useQueryPendingContacts();
  const { items: pendingUsers } = data || {};

  return (
    <Stack direction={"column"}>
      <Stack maxWidth={300} p={5} direction={"column"}>
        <Typography>Pending Invitations</Typography>
        <Divider />
        {pendingUsers &&
          pendingUsers.map((contact) => <PendingContact {...{ contact }} />)}
      </Stack>
    </Stack>
  );
};
