import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import { ApiProvider } from "./providers/ApiProvider";
import { VideoProcessHistoryProvider } from "./providers/VideoProcessHistoryProvider";
import { UrlSelectorProvider } from "./providers/UrlSelectorProvider";
import { AuthProvider } from "react-oidc-context";
declare module "@mui/material/Paper" {
  interface PaperPropsVariantOverrides {
    glass: true;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    glass: true;
  }
}

const cognitoAuthConfig = {
  authority: process.env.REACT_APP_COGNITO_AUTHORITY,
  client_id: process.env.REACT_APP_COGNITO_CLIENT_ID,
  redirect_uri: process.env.REACT_APP_COGNITO_REDIRECT_URI,
  automaticSilentRenew: true,
  post_logout_redirect_uri: process.env.REACT_APP_COGNITO_REDIRECT_URI,
  response_type: "code",
  scope: "profile openid email",
  onSigninCallback: () => {
    window.history.replaceState({}, document.title, window.location.pathname);
  },
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ApiProvider>
        <VideoProcessHistoryProvider>
          <UrlSelectorProvider>
            <AuthProvider {...cognitoAuthConfig}>
              <App />
            </AuthProvider>
          </UrlSelectorProvider>
        </VideoProcessHistoryProvider>
      </ApiProvider>
    </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();
