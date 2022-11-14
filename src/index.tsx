import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./Redux/store";
import { QueryClientProvider } from "react-query";
import { queryClient } from "./ReactQuery";
import { ReactQueryDevtools } from "react-query/devtools";
import { createTheme, ThemeProvider } from "@mui/material";
const root = ReactDOM.createRoot(document.getElementById("root") as any);

const theme = createTheme({
  palette: {
    primary: {
      main: "#bcaaa4",
      light: "#efdcd5",
      dark: "#8c7b75",
      contrastText: "rgba(0,0,0,.5)",
    },
    secondary: {
      main: "#5daf79",
      light: "#8ee1a8",
      dark: "#2b7f4d",
      contrastText: "rgba(0,0,0,.5)",
    },
  },
});

root.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
        {true && <ReactQueryDevtools initialIsOpen={false} />}
      </QueryClientProvider>
    </Provider>
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
