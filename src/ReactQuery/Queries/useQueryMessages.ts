import { useInfiniteQuery, useQuery } from "react-query";
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
  const query = useInfiniteQuery<any, any, queryType | undefined>(
    queryKey,
    async ({ pageParam: skip = 0 }) => {
      console.log("skip", skip);
      const response = await PromisedQb.messagesList({
        dialogId: props.dialogId,
        limit: props.limit,
        skip,
      });
      // check if response was ok
      if (response?.limit) {
        return response;
      }
    },
    {
      enabled: chatConnected && props.dialogId !== "" && !!props.dialogId,
      getNextPageParam: (lastResponse) => {
        // check if more pages exist
        // returning undefined will set the hasNextPage param to false
        const hasMore = lastResponse?.items.length >= props.limit;
        console.log("hasMore", hasMore);
        if (!hasMore) {
          return;
        }
        // this will return the skip amount to fetch more messages
        const totalMessageQuery = queryClient.getQueryData(queryKey) as any;
        const { pages }: { pages: Array<queryType> } = totalMessageQuery || {};
        if (pages) {
          const length = pages.reduce(
            (acc, page) => acc + page.items.length,
            0
          );
          return length;
        }
      },
    }
  );
  return query;
};
