import { Box, Button, Link, Stack, TextField, Typography } from "@mui/material";
import { useMemo } from "react";

export const RequestsModal = () => {
  const submitButtonLabel = useMemo(() => {
    return "Send Invite";
  }, []);
  return (
    <Stack direction={"column"}>
      <Stack maxWidth={300}p={5} direction={"column"}>
        <Typography>
          Enter email or username of person. If that user exists, they will
          receive an invite.
        </Typography>
        <TextField  InputProps={{style:{padding:0,margin:0}}}/>
        <Button> {submitButtonLabel}</Button>
      </Stack>
      <Stack direction={"column"} p={2}>
        <Typography>Your Invitiation Link:</Typography>
        <Link>whatsapp-clone-f4523</Link>
      </Stack>
    </Stack>
  );
};
