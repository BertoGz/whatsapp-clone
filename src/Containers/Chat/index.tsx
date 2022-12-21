// @ts-nocheck
import { MessageBox } from "react-chat-elements";

import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  FormHelperText,
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
import { VideoCameraFrontRounded } from "@mui/icons-material";
import { colorHelper, theme } from "../../Theme";
import { PromisedQb } from "../../Quickblox";
import { usePrevValue } from "../../Hooks/usePrevValue";
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
  const { message: text, created_at, _id } = message || {};
  const { isSender } = extraProps || {};
  return (
    <MessageBox
      key={_id}
      position={isSender ? "right" : "left"}
      type={"text"}
      text={text}
      date={created_at}
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
const LoadMoreSection = (props: { showLoadMore: boolean; onLoadMore: any }) => {
  return (
    <>
      {props.showLoadMore && (
        <PressableText onClick={props.onLoadMore}>
          Load Previous Messages
        </PressableText>
      )}
    </>
  );
};

const InputSection = ({ dialogId, opponentId, full_name }) => {
  const [input, setInput] = useState("");

  console.log("input", input);
  useEffect(() => {
    if (input) {
      // send is typing

      PromisedQb.sendIsTyping(true, opponentId);
    } else if (!input) {
      PromisedQb.sendIsTyping(false, opponentId);
      // stop send ins typing
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input]);
  const { mutateAsync } = useMutationSendMessage({ dialogId });
  const userIsTyping = useAppSelector((state) => state.Quickblox.userIsTyping);
  const isOpponentTyping = useMemo(() => {
    const parsed = JSON.parse(userIsTyping);
    if (parsed?.[opponentId]) {
      return true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userIsTyping]);
  function onSendMessage() {
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
    <Stack
      sx={{
        display: "flex",
        width: "100%",
        align: "center",
        backgroundColor: theme.palette.secondary.dark,

        pb: 2,
      }}
    >
      <FormHelperText
        sx={{
          color: theme.palette.getContrastText(theme.palette.secondary.dark),
          height: "20px",
        }}
      >
        {isOpponentTyping ? `${full_name} is typing...` : ""}
      </FormHelperText>

      <Stack
        direction="row"
        sx={{
          px: 1,
        }}
        maxWidth={"800px"}
      >
        <TextField
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          sx={{
            mr: 1,
            backgroundColor: theme.palette.background.default,
            borderRadius: 0,
            justifyContent: "center",
          }}
          InputProps={{ style: { borderRadius: 0, height: "40px" } }}
        />
        <Button
          sx={{
            width: "30px",
            textTransform: "none",
            fontWeight: "bold",
            backgroundColor: theme.palette.background.default,
          }}
          color="secondary"
          disabled={!input}
          onClick={onSendMessage}
        >
          Send
        </Button>
      </Stack>
    </Stack>
  );
};

let scrollTo = "bottom";
const Chat = () => {
  const theme = useTheme();
  const selectedProfile = useAppSelector(
    (state) => state.AppState.selectedProfile
  );
  const prevContact = usePrevValue(selectedProfile);
  const { data: contact } = useQueryContact(selectedProfile);
  console.log("selectedProfile", selectedProfile, contact);
  const { dialog, user } = contact?.[0] || {};
  const { _id } = dialog || {};
  const { id: opponent_id, full_name } = user || {};

  const {
    data: messagesResponse,
    isLoading,
    getPrevMessages,
  } = useQueryMessages({
    dialogId: _id,
    limit: 10,
  });
  const { hasMore } = messagesResponse || {};

  // const { items: messages } = messagesResponse || {};
  // console.log("!!@@messages", messagesResponse);
  const messageListRef = useRef();
  const scrollToBottom = () => {
    messageListRef?.current?.scrollIntoView({ behavior: "smooth" });
    const scrollContainer = document.getElementById("scrollContainer");
    scrollContainer.scrollTo({
      top: scrollContainer.scrollHeight,
      left: 0,
      behavior: "smooth",
    });
  };
  const scrollToTop = () => {
    messageListRef?.current?.scrollIntoView({ behavior: "smooth" });
    const scrollContainer = document.getElementById("scrollContainer");
    scrollContainer.scrollTo({ top: 0, behavior: "smooth" });
  };

  const MessageList = useMemo(() => {
    if (!messagesResponse?.items?.length) {
      return undefined;
    }
    const messagesCopy = [...messagesResponse.items];

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
        default:
          return <></>;
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messagesResponse]);

  useEffect(() => {
    if (prevContact !== selectedProfile) {
      //firstMount = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProfile]);

  async function onLoadMore() {
    scrollTo = "top";
    await getPrevMessages();
  }
  useEffect(() => {
    if (scrollTo === "top") {
      scrollToTop();
    } else {
      scrollToBottom();
    }
    scrollTo = "bottom";
  }, [MessageList]);
  const headerHeight = document.getElementById("mobile-header")?.clientHeight;
  return (
    <>
      <Stack
        direction="column"
        sx={{
          width: "100%",
          height: window.innerHeight - headerHeight,
          backgroundColor: "red",
        }}
      >
        <div className="desktop-view-only">
          <Stack
            direction="row"
            sx={{
              backgroundColor: theme.palette.secondary.main,
              alignItems: "center",
              borderWidth: 0,
              borderStyle: "solid",
              zIndex: 1,
              height: "60px",
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
                  color: colorHelper.contrastText("secondaryMain"),
                }}
              >
                {user?.full_name}
              </Typography>
            </Stack>
            <Box p={2}>
              <VideoCameraFrontRounded
                sx={{ color: colorHelper.contrastText("secondaryMain") }}
                fontSize="large"
              />
            </Box>
          </Stack>
        </div>
        <div
          id="scrollContainer"
          key={MessageList?.length}
          ref={messageListRef}
          style={{
            overflow: "scroll",
            overscrollBehaviorY: "contain",
            overflowAnchor: "none",
            justifyItems: "center",
            flexDirection: "column",
            height: `calc(100%)`,

            backgroundColor: colorHelper.darkenColor("secondaryDark", 0.2),
          }}
        >
          <LoadMoreSection showLoadMore={hasMore} onLoadMore={onLoadMore} />
          {isLoading ? (
            <CircularProgress />
          ) : (
            <Stack
              sx={{ width: "100%" }}
              alignSelf={"center"}
              direction="column"
              maxWidth={"800px"}
            >
              {MessageList}
            </Stack>
          )}
          <div
            style={{
              pointerEvents: "none",
              position: "absolute",
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
              overflow: "hidden",
              backgroundImage: `url(${imgUrl})`,
              backgroundSize: "1000px",
              backgroundPosition: "center center",
              backgroundRepeat: "repeat",
              backgroundBlendMode: "multiply",
              backgroundColor: theme.palette.secondary.dark,
              opacity: 0,
            }}
          />
        </div>

        <InputSection
          dialogId={_id}
          opponentId={opponent_id}
          {...{ full_name }}
        />
      </Stack>
    </>
  );
};
export default Chat;
