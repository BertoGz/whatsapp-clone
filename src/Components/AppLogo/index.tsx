import logo from "../../Files/logo.png";
export const AppLogo = ({ width = "200px" }: { width?: string }) => {
  return (
    <img
      src={logo}
      style={{
        width,
        height: "auto",
        objectFit: "contain",
      }}
    />
  );
};
