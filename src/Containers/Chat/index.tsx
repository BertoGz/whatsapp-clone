// @ts-nocheck
import { MessageBox } from "react-chat-elements";
import { Box, Typography, useTheme } from "@mui/material";
import "react-chat-elements/dist/main.css";
import { useQueryMessages } from "../../ReactQuery/Queries/useQueryMessages";
import { useAppSelector } from "../../Redux/useAppSelector";
import { useQueryQbDialogs } from "../../ReactQuery";

const TextMessage = () => {
  return (
    <MessageBox
      position={"left"}
      type={"text"}
      title={"Message Box Title"}
      text="Here is a text type message box"
    />
  );
};
const PhotoMessage = () => {
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
const Chat = () => {
  const theme = useTheme();
  const selectedProfile = useAppSelector(
    (state) => state.AppState.selectedProfile
  );
  const { data: dialogs } = useQueryQbDialogs();
  const correctDialog = dialogs?.items.find(dialog=>dialog)
  const { data: messages } = useQueryMessages({});
  return (
    <Box
      sx={{
        height: "100%",
        backgroundColor: theme.palette.secondary.light,
      }}
    >
      <Typography>This is the chat screen</Typography>

      <TextMessage />

      <PhotoMessage />
      <VideoMessage />
    </Box>
  );
};
export default Chat;
