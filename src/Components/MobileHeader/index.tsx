import { Avatar, Box, ButtonBase, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { setHamburgerIsOpen } from "../../Redux/AppState";
import { useAppDispatch } from "../../Redux/useAppDispatch";
import { useAppSelector } from "../../Redux/useAppSelector";
import { colorHelper, theme } from "../../Theme";
import { Stack } from "@mui/system";
import { VideoCameraFrontRounded } from "@mui/icons-material";
import { useQueryContact } from "../../ReactQuery";
const profilepic =
  "https://www.thesun.co.uk/wp-content/uploads/2022/05/309E522E-D141-11EC-BE62-1280C3EF198F.jpeg";

export const MobileHeader = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.AppState.hamburgerIsOpen);
  const selectedProfile = useAppSelector(
    (state) => state.AppState.selectedProfile
  );
  const { data: contact } = useQueryContact(selectedProfile);
  console.log("selectedProfile", selectedProfile, contact);
  const { user } = contact?.[0] || {};

  return (
    <div className="mobile-view-only" id="mobile-header">
      <Stack
        direction={"row"}
        height="55px"
        sx={{
          zIndex: 99,
          backgroundColor: colorHelper.darkenColor("secondaryMain", 0),
          p: 1,
        }}
        alignItems={"center"}

      >
        <ButtonBase
          sx={{
            backgroundColor: "rgba(0,0,0,.5)",
            borderRadius: "30px",
            p: 1,
          }}
          onClick={() => dispatch(setHamburgerIsOpen(!isOpen))}
        >
          <MenuIcon fontSize="large" sx={{ color: "white" }} />
        </ButtonBase>
        {user && (
          <>
            <Stack
              direction="row"
              alignItems={"center"}
            
              px={2}
              sx={{ width: "100%" }}
            >
              <Avatar
                alt={user?.full_name}
                src={profilepic}
                sx={{
                  outlineStyle: "solid",
                  outlineWidth: "2px",
                  outlineColor: theme.palette.secondary.main,
                  margin: 1,
                }}
              />
              <Typography
                sx={{
                  color: colorHelper.contrastText("secondaryMain"),
                }}
              >
                {user?.full_name}
              </Typography>
            </Stack>
            <Box px={2} >
              <VideoCameraFrontRounded
                sx={{ color: colorHelper.contrastText("secondaryMain") }}
                fontSize="large"
              />
            </Box>
          </>
        )}
      </Stack>
    </div>
  );
};
