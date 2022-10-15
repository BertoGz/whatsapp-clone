import React from "react";
import {
  Avatar,
  Divider,
  Grid,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { Email, Home, Phone } from "@mui/icons-material";
import EditableLabel from "../../Components/EditableLabel";
import { Box } from "@mui/system";
import { users } from "../../Data";
import { useAppSelector } from "../../Redux/useAppSelector";

//const settings = [{type:'email',}];
const BaseInfo = ({
  val = "",
  label = "",
  type = "",
  canEdit = true,
}: {
  val?: string;
  label?: string;
  canEdit?: boolean;
  type: "email" | "phone" | "address" | "username" | "";
}) => {

 // const [infoLabel, setInfoLabel] = useState(label);


  const GetIcon = () => {
    switch (type) {
      case "email":
        return <Email color="primary" />;
      case "phone":
        return <Phone color="primary" />;
      case "address":
        return <Home color="primary" />;
      default:
        return <></>;
    }
  };
  function GetPlaceHolder() {
    switch (type) {
      case "username":
        return "Username";
      case "email":
        return "Email";
      case "phone":
        return "Phone Number";
      case "address":
        return "Address";
      default:
        return <></>;
    }
  }
  const getProps = () => {
    switch (type) {
      case "address":
        return { multiline: true };
      default:
        return {};
    }
  };
  const props = getProps();

  return (
    <Stack direction="row" alignItems={"flex-start"}>
      <Box p={2}>
        <GetIcon />
      </Box>

      <>
        {canEdit ? (
          <Tooltip title="Edit">
            <Stack>
              <EditableLabel
                fontSize={19}
                placeholder={GetPlaceHolder()}
                initialVal={val}
                onBlur={() => {
                  // setIsEdit(false);
                }}
                onFocus={() => {
                  // setIsEdit(true);
                }}
                {...{ canEdit }}
                {...props}
              />

              <EditableLabel
                placeholder={"Add Note"}
                initialVal={label}
                onBlur={() => {
                  // setIsEdit(false);
                }}
                onFocus={() => {
                  //setIsEdit(true);
                }}
                {...{ canEdit }}
                color="gray"
              />
            </Stack>
          </Tooltip>
        ) : (
          <Stack>
            <EditableLabel
              fontSize={19}
              placeholder={GetPlaceHolder()}
              initialVal={val}
              onBlur={() => {
                // setIsEdit(false);
              }}
              onFocus={() => {
                // setIsEdit(true);
              }}
              {...{ canEdit }}
              {...props}
            />

            <EditableLabel
              placeholder={"Add Note"}
              initialVal={label}
              onBlur={() => {
                // setIsEdit(false);
              }}
              onFocus={() => {
                //setIsEdit(true);
              }}
              {...{ canEdit }}
              color="gray"
            />
          </Stack>
        )}
      </>
    </Stack>
  );
};

const Profile = () => {
  const { selectedProfile } = useAppSelector((state) => state.AppState);
  let user = null;
  if (selectedProfile) {
    const foundUser = users.find((user) => user.user_id === selectedProfile);
    if (foundUser) {
      user = foundUser;
    }
  }
  const {
    profilepic,
    firstname,
    lastname,
    username,
    role,
    phone,
    email,
    address,
  } = user || {};
  if (selectedProfile) {
    return (
      <Stack direction="column" divider={<Divider />} flex={1}>
        <Stack alignItems={"center"}>
          <Avatar sx={{ height: 100, width: 100 }} src={profilepic} />
          <Typography variant="h5" fontWeight={"bold"}>
            {firstname} {lastname}
          </Typography>
          <Typography color="GrayText" variant="h6" fontWeight={"600"}>
            {role}
          </Typography>
        </Stack>

        <Grid
          container
          spacing={2}
          alignItems="flex-start"
          justifyContent={"center"}
          paddingTop={2}
        >
          <Grid item>
            <BaseInfo
              val={username}
              label="username"
              type="username"
              canEdit={false}
            />
          </Grid>
          <Grid item>
            <BaseInfo val={phone} label="home phone" type="phone" />
          </Grid>
          <Grid item>
            <BaseInfo val={email} label="work email" type="email" />
          </Grid>
          <Grid item>
            <BaseInfo val={address} label="home address" type="address" />
          </Grid>
        </Grid>
      </Stack>
    );
  }
  return (
    <Stack flex={1} height="100vh" justifyContent="center">
      <Typography variant="h4">Welcome To Whatsapp-clone!</Typography>
      <Typography variant="h5" color="GrayText">
        Select a contact to begin chatting
      </Typography>
    </Stack>
  );
};
export default Profile;
