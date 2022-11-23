// @ts-nocheck
import { MessageBox, Input } from "react-chat-elements";

import {
  Avatar,
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
import { useEffect, useMemo, useRef, useState } from "react";
import { useMutationSendMessage } from "../../ReactQuery/Mutations/useMutationSendMessage";
import { PressableText } from "../../Components/ClickableText";
import {
  VideoCameraFrontRounded,
} from "@mui/icons-material";
import { colorHelper } from "../../Theme";
const profilepic =
  "https://www.thesun.co.uk/wp-content/uploads/2022/05/309E522E-D141-11EC-BE62-1280C3EF198F.jpeg";

const imgUrl =
  "https://img.freepik.com/free-vector/topographic-contour-lines-map-seamless-pattern_1284-52862.jpg?w=2000";
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
const LoadMoreSection = () => {
  const [showLoadMore, setShowLoadMore] = useState(true);

  return (
    <>{showLoadMore && <PressableText>Load Previous Messages</PressableText>}</>
  );
};
const InputSection = ({ dialogId, opponentId }) => {
  const [input, setInput] = useState("");

  console.log("input", input);
  const { mutateAsync } = useMutationSendMessage({ dialogId });
  const elRef = useRef();
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
        InputProps={{ height: "20px" }}
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
  const { data: messagesResponse } = useQueryMessages({
    dialogId: _id,
    limit: 50,
  });
  const { items: messages } = messagesResponse || {};
  // console.log("!!@@messages", messagesResponse);
  const messageListRef = useRef();
  const MessageList = useMemo(() => {
    if (!messages?.length) {
      return undefined;
    }
    const messagesCopy = [...messages];
    return messagesCopy?.reverse()?.map((message) => {
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

  const scrollToBottom = () => {
    messageListRef?.current?.scrollIntoView({ behavior: "smooth" });
    const scrollContainer = document.getElementById("scrollContainer");
    scrollContainer.scrollTo({
      top: scrollContainer.scrollHeight,
      left: 0,
      behavior: "auto",
    });
  };

  console.log("messageref", messageListRef);
  useEffect(() => {
    scrollToBottom();
  }, [messages?.length]);
  return (
    <>
      <Stack
        direction="column"
        sx={{
          height: "100%",
          backgroundColor: theme.palette.secondary.light,
        }}
      >
        <Stack
          direction="row"
          sx={{
            backgroundColor: theme.palette.secondary.light,
            alignItems: "center",
            borderWidth: 0,
            borderBottomWidth: "2px",
            borderStyle: "solid",
            borderBottomColor: theme.palette.secondary.main,
            zIndex: 1,
          }}
          justifyContent="space-between"
        >
          <Stack direction="row" alignItems={"center"} px={2}>
            <Avatar
              alt={user?.full_name}
              src={profilepic}
              sx={{
                outlineStyle: "solid",
                outlineWidth: "2px",
                outlineColor: theme.palette.secondary.main,
                margin: 1,
              }}
            />
            <Typography
              sx={{
                color: colorHelper.contrastText('secondaryMain'),
              }}
            >
              {user?.full_name}
            </Typography>
          </Stack>
          <Box p={2} >
            <VideoCameraFrontRounded sx={{color:colorHelper.contrastText('secondaryMain')}} fontSize="large"/>
          </Box>
        </Stack>
        <div
          id="scrollContainer"
          key={messages?.length}
          ref={messageListRef}
          style={{
            overflow: "scroll",
            overscrollBehaviorY: "contain",
            overflowAnchor: "none",
            justifyItems: "center",
            display: "flex",
            flexDirection: "column",
            backgroundImage: `url(${imgUrl})`,
            backgroundSize: "1000px",
            backgroundPosition: "center center",
            backgroundRepeat: "repeat",
            backgroundBlendMode: "soft-light",
            backgroundColor: theme.palette.secondary.dark,
          }}
        >
          <LoadMoreSection />
          <Stack
            direction="column"
            justifySelf={"flex-end"}
            maxWidth={"1000px"}
          >
            {MessageList}
          </Stack>
        </div>

        <InputSection dialogId={_id} opponentId={opponent_id} />
      </Stack>
    </>
  );
};
export default Chat;
