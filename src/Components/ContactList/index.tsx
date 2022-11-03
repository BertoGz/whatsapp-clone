import { Stack } from "@mui/system";
import React from "react";
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
  const { mutateAsync } = useMutationAcceptRequest();
  const dispatch = useAppDispatch();
  function onClick(user_id: number) {
    dispatch(setSelectedProfile(user_id));
    mutateAsync(user_id);
  }

  return (
    <Stack direction={"column"} flex={1}>
      {data.map((item) => {
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
