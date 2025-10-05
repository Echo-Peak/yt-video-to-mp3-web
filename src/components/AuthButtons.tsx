import { Box, Button } from "@mui/material";
import { useAuth } from "react-oidc-context";

export const AuthButtons = () => {
  const auth = useAuth();

  return (
    <Box>
      {auth.isAuthenticated ? (
        <Button
          onClick={() => {
            auth.signoutSilent();
          }}
        >
          {auth.user?.profile?.email} (Logout)
        </Button>
      ) : (
        <Button onClick={() => auth.signinRedirect()}>Login</Button>
      )}
    </Box>
  );
};
