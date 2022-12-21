import {
  Button,
  FormHelperText,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";
import { useMutationSendFriendRequest } from "../../ReactQuery/Mutations/useMutationSendFriendRequest";

export const AddContactModal = () => {
  const submitButtonLabel = useMemo(() => {
    return "Send Invite";
  }, []);
  const { mutateAsync, isLoading, isSuccess, isError } =
    useMutationSendFriendRequest();
  const [input, setInput] = useState("");
  function onSubmit() {
    mutateAsync(input, {
      onSuccess: () => {
     //   InitQbChatListeners();
      },
    });
  }
  return (
    <Stack direction={"column"}>
      <Stack maxWidth={300} p={5} direction={"column"}>
        <Typography>
          Enter email or username of person. If that user exists, they will
          receive an invite.
        </Typography>
        <TextField
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          InputProps={{ style: { padding: 0, margin: 0 } }}
        />
        {isSuccess ? (
          <Button>Request Sent</Button>
        ) : (
          <Button onClick={onSubmit}> {submitButtonLabel}</Button>
        )}
        {isError && (
          <FormHelperText sx={{ color: "red" }}>
            Something went wrong
          </FormHelperText>
        )}
        {isLoading && <FormHelperText>Loading</FormHelperText>}
      </Stack>
      <Stack direction={"column"} p={2}>
        <Typography>Your Invitiation Link:</Typography>
        <Link>whatsapp-clone-f4523</Link>
      </Stack>
    </Stack>
  );
};
