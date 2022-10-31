import { ButtonBase, Typography } from "@mui/material";

export const PressableText = ({
  onClick,
  children,
}: {
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
  children: string;
}) => {
  return (
    <ButtonBase onClick={onClick}>
      <Typography
        display={"inline"}
        noWrap
        variant="h6"
        sx={{
          color: "white",
          ":hover": { color: "ButtonHighlight" },
        }}
      >
        {children}
      </Typography>
    </ButtonBase>
  );
};
