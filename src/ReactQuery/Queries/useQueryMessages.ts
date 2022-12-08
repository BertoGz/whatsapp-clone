import { useQuery } from "react-query";
import { queryClient } from "..";
import { PromisedQb } from "../../Quickblox";
import { useAppSelector } from "../../Redux/useAppSelector";

type queryType = {
  items: Array<TypeDataEntityMessage | undefined>;
  limit: number;
  hasMore: boolean;
};
export const useQueryMessages = (props = { dialogId: "", limit: 100 }) => {
  const chatConnected = useAppSelector(
    (state) => state.Quickblox.chatConnected
  );
  const queryKey = ["messages", props.dialogId];

  async function getMessagesFn({ pageParam = 0 }) {
    const queryRef = queryClient.getQueryData(queryKey) as any;
    const prevMessages = (queryRef?.items || []) as queryType["items"];

    const response = await PromisedQb.messagesList({
      dialogId: props.dialogId,
      limit: props.limit,
      skip: pageParam,
    });

    // check if response has more
    const hasMore = response?.items?.length >= props.limit;

    // format the messages by replacing any prev messages with ones caught in the response
    function formattedMessages() {
      // update the previous messages with matching new ones

      const newMessages = [] as any;
      // from new to old
      let updatedPrevMessages = [...prevMessages];

      // replace any old messages with new payload items
      // form an array of new messages to append at the start of the stack
      for (let i = 0; i < response.items?.length; i++) {
        let messageFound = false;
        for (let y = 0; y < prevMessages?.length; y++) {
          if (prevMessages[y]?._id === response?.items[i]?._id) {
            updatedPrevMessages[y] = response?.items[i];
            messageFound = true;
          }
        }
        if (!messageFound) {
          newMessages.push(response?.items[i]);
        }
      }
      const formatted = [
        ...newMessages,
        ...updatedPrevMessages,
      ] as Array<TypeDataEntityMessage>;
      return formatted.sort((a, b) => (a?.date_sent < b?.date_sent ? 1 : -1));
    }
    if (response?.limit) {
      return {
        ...response,
        items: formattedMessages(),
        skip: pageParam,
        hasMore,
      };
    }
  }

  async function getPrevMessages() {
    const queryRef = queryClient.getQueryData(queryKey) as any;
    const skip = queryRef?.items?.length || 0;
    const res = await getMessagesFn({ pageParam: skip });
    queryClient.setQueryData(queryKey, res);
  }

  const query = useQuery<any, any, queryType | undefined>(
    queryKey,
    getMessagesFn,
    {
      staleTime: 1200000, // 20 minutes
      enabled: chatConnected && props.dialogId !== "" && !!props.dialogId,
      getNextPageParam: () => 0,
      getPreviousPageParam: () => 0,
      refetchOnWindowFocus: true,
    }
  );
  return { ...query, getPrevMessages };
};
