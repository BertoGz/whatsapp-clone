import { useQuery } from "react-query";
import { PromisedQb } from "../../Quickblox";
import { useAppSelector } from "../../Redux/useAppSelector";

export const useQueryMessages = (
  props = { dialogId: "", limit: 100, skip: 0 }
) => {
  const chatConnected = useAppSelector(
    (state) => state.Quickblox.chatConnected
  );
  const queryKey = ["messages", props.dialogId];
  const query = useQuery<
    any,
    any,
    {
      items: Array<TypeDataEntityMessage>;
      skip: number;
      limit: number;
      hasMore: boolean;
    }
  >(
    queryKey,
    async () => {
      const response = await PromisedQb.messagesList({
        dialogId: props.dialogId,
        limit: props.limit,
        skip: props.skip,
      });
      // check if response was ok
      if (response?.limit) {
        const hasMore = response?.items.length === props.limit;
        return { ...response, hasMore };
      }
      return {};
    },
    { enabled: chatConnected && props.dialogId !== "" && !!props.dialogId }
  );
  return query;
};
