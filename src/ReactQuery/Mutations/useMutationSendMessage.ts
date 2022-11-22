import { useMutation } from "react-query";
import { queryClient } from "..";
import { PromisedQb } from "../../Quickblox";

type params = {
  dialogId: string;
  opponentId: number;
  message: string;
};
export const useMutationSendMessage = ({
  dialogId = "",
}: {
  dialogId: TypeDataEntityMessage["chat_dialog_id"];
}) => {
  async function sendMessageFn(
    props = { dialogId: "", opponentId: 0, message: "" } as params
  ) {
    const response = await PromisedQb.sendMessage(props);
    console.log("response send message", response);
    debugger;
  }
  return useMutation<any, any, params>(sendMessageFn, {
    onSuccess: () => {
      queryClient.invalidateQueries(["messages", dialogId]);
      queryClient.refetchQueries({ queryKey: ["contacts", dialogId] });
    },
  });
};
