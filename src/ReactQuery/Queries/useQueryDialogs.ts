import { useQuery } from "react-query";
import { PromisedQb } from "../../Quickblox";
import { useAppSelector } from "../../Redux/useAppSelector";
const key = "dialogs";

type returnType = Array<any>;
export const useQueryQbDialogs = () => {
  const chatConnected = useAppSelector(
    (state) => state.Quickblox.chatConnected
  );
  const query = useQuery<any, any, returnType>(
    key,
    async () => {
      let params = {
        limit: 100,
      };
      const data = await PromisedQb.dialogList(params);
      if (data) {
        return data;
      }

      //   QB.chat.dialog.list(params, function(error, dialogs) {

      //  });
    },
    {
      enabled: chatConnected,
    }
  );
  return query;
};
