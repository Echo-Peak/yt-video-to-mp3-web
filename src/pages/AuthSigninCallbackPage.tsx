import { Card, Container, Typography } from "@mui/material";
import { useEffect } from "react";
import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router";

export const AuthSigninCallbackPage = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    if (auth.isAuthenticated && !auth.isLoading) {
      navigate("/", { replace: true });
    }
  }, [auth.isAuthenticated, auth.isLoading, navigate]);

  return (
    <Container>
      <Card variant="glass" sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5">Signing you in...</Typography>
      </Card>
    </Container>
  );
};
