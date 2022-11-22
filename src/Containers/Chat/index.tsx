// @ts-nocheck
import { MessageBox, Input } from "react-chat-elements";

import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import "react-chat-elements/dist/main.css";
import { useQueryMessages } from "../../ReactQuery/Queries/useQueryMessages";
import { useAppSelector } from "../../Redux/useAppSelector";
import { useQueryContact } from "../../ReactQuery";
import { useMemo, useRef, useState } from "react";
import { useMutationSendMessage } from "../../ReactQuery/Mutations/useMutationSendMessage";

const TextMessage = ({
  message,
  extraProps,
}: {
  message: TypeDataEntityMessage;
  extraProps: { isSender: boolean };
}) => {
  const { message: text } = message || {};
  const { isSender } = extraProps || {};
  return (
    <MessageBox
      position={isSender ? "right" : "left"}
      type={"text"}
      text={text}
    />
  );
};
const PhotoMessage = ({
  message,
  extraProps,
}: {
  message: TypeDataEntityMessage;
  extraProps: { isSender: boolean };
}) => {
  return (
    <MessageBox
      position={"left"}
      type={"photo"}
      title={"Kursat"}
      data={{
        uri: "https://picsum.photos/200/200",
      }}
    />
  );
};
const VideoMessage = () => {
  return (
    <MessageBox
      position={"right"}
      type={"video"}
      title={"Kursat"}
      data={{
        videoURL:
          "https://www.sample-videos.com/video123/mp4/240/big_buck_bunny_240p_1mb.mp4",
        status: {
          click: true,
          loading: 0.5,
          download: true,
        },
      }}
    />
  );
};
const InputSection = ({ dialogId, opponentId }) => {
  const [input, setInput] = useState("");

  console.log("input", input);
  const { mutateAsync } = useMutationSendMessage({ dialogId });
  const elRef = useRef();
  console.log("ref", elRef);
  function onSendMessage() {
    debugger;
    mutateAsync(
      { dialogId, opponentId, message: input },
      {
        onSuccess: () => {
          setInput("");
          //  ref.current;
        },
      }
    );
  }
  return (
    <Stack direction="row" sx={{ backgroundColor: "Background" }}>
      <TextField
        value={input}
        fullWidth
        onChange={(e) => setInput(e.target.value)}
      />
      <Button color="secondary" disabled={!input} onClick={onSendMessage}>
        Send
      </Button>
    </Stack>
  );
};
const Chat = () => {
  const theme = useTheme();
  const selectedProfile = useAppSelector(
    (state) => state.AppState.selectedProfile
  );
  const { data: contact } = useQueryContact(selectedProfile);
  const { dialog, user } = contact || {};
  const { _id } = dialog || {};
  const { id: opponent_id } = user || {};
  //const correctDialog = dialogs?.items.find(dialog=>dialog)
  const { data: messagesResponse } = useQueryMessages({ dialogId: _id });
  const { items: messages } = messagesResponse || {};
  console.log("!!@@messages", messagesResponse);
  const MessageList = useMemo(() => {
    return messages?.reverse()?.map((message) => {
      const { attachments, sender_id } = message || {};
      let messageType: "photo" | "text" = "text";
      if (attachments?.length > 0) {
        messageType = "photo";
      }
      const extraProps = {};
      extraProps.isSender = sender_id !== opponent_id;
      switch (messageType) {
        case "text":
          return <TextMessage {...{ message, extraProps }} />;
        case "photo":
          return <PhotoMessage {...{ message, extraProps }} />;
      }
    });
  }, [messages]);
  return (
    <Box
      sx={{
        height: "100%",
        backgroundColor: theme.palette.secondary.light,
      }}
    >
      <Typography>This is the chat screen</Typography>
      {MessageList}
      <InputSection dialogId={_id} opponentId={opponent_id} />
    </Box>
  );
};
export default Chat;
