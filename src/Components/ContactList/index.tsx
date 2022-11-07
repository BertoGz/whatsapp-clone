import { Stack } from "@mui/system";
import React, { useMemo } from "react";
import { useMutationAcceptRequest } from "../../ReactQuery/Mutations/useMutationAcceptRequest";
//import { users } from "../../Data";
import { setSelectedProfile } from "../../Redux/AppState";
import { useAppDispatch } from "../../Redux/useAppDispatch";
import ContactListItem from "../ContactListItem";

const ContactList = ({
  data = [],
}: {
  data: Array<TypeDataEntityQbUser | null>;
}) => {
  const { mutateAsync:acceptRequestMutation } = useMutationAcceptRequest();
  const dispatch = useAppDispatch();
  function onClick(user_id: number) {
    dispatch(setSelectedProfile(user_id));
    acceptRequestMutation(user_id);
  }

  const subscribedUsers = useMemo(() => {
   return data // return data.filter((user) => user?.friend.subscription !== "none");
  }, [data]);

  return (
    <Stack direction={"column"} flex={1}>
      {subscribedUsers.map((item) => {
        if (!item) {
          return <></>;
        }
        return (
          <ContactListItem
            {...{ item }}
            onClick={() => {
              onClick(item.id);
            }}
          />
        );
      })}
    </Stack>
  );
};
export default ContactList;
