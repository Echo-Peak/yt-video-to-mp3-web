import { Card, Container, Typography } from "@mui/material";

export const NotFoundPage = () => {
  return (
    <Container>
      <Card variant="glass" sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5">404 - Page Not Found</Typography>
      </Card>
    </Container>
  );
};
