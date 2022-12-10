import { RefreshRounded } from "@mui/icons-material";
import {
  ButtonBase,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { useMemo } from "react";
import PendingContactListItem from "../../Components/PendingContactListItem";
import { SYSTEM_MESSAGE_RELATIONSHIP_ACCEPT } from "../../Contants";
import { PromisedQb } from "../../Quickblox";
import { useQueryContacts } from "../../ReactQuery";
import { useMutationUpdateRelationship } from "../../ReactQuery";

export const RequestsModal = () => {
  const {
    data: pendingUsers,
    isFetching,
    refetch,
  } = useQueryContacts({
    status: "pending",
  });
  const { mutateAsync: updateRelationshipMutation } =
    useMutationUpdateRelationship();

  function onAccept(contact: TypeDataEntityContact) {
    updateRelationshipMutation(
      {
        relationship_id: contact.relationship.relationship_id,
        status: 1,
      },
      {
        onSuccess: () => {
          PromisedQb.sendSystemMessage(
            contact.user.id,
            SYSTEM_MESSAGE_RELATIONSHIP_ACCEPT
          );
        },
      }
    );
  }
  const pendingUserRequests = useMemo(() => {
    if (!pendingUsers) {
      return [];
    }
    return pendingUsers.filter((user) => !user?.relationship.isInitiator);
  }, [pendingUsers]);
  const invitationsLength = pendingUserRequests?.length;
  return (
    <Stack direction={"column"} p={2}>
      {invitationsLength > 0 && (
        <ButtonBase sx={{ alignSelf: "flex-end" }} onClick={() => refetch()}>
          <RefreshRounded />
        </ButtonBase>
      )}
      <Stack p={2} direction={"column"}>
        <>
          {invitationsLength > 0 && (
            <>
              <Typography fontWeight={"bold"}>Pending Invitations</Typography>
              <Divider />
              {isFetching ? (
                <CircularProgress />
              ) : (
                <>
                  {pendingUserRequests.map((item) => {
                    if (!item) {
                      return <></>;
                    }
                    return (
                      <PendingContactListItem
                        {...{ item, variant: "request", onAccept }}
                      />
                    );
                  })}
                </>
              )}
            </>
          )}
          {invitationsLength === 0 && (
            <>
              <Typography fontWeight="bold">No invitations</Typography>
              {isFetching ? (
                <CircularProgress />
              ) : (
                <ButtonBase onClick={() => refetch()}>
                  <RefreshRounded />
                </ButtonBase>
              )}
            </>
          )}
        </>
      </Stack>
    </Stack>
  );
};
