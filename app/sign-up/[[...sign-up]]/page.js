"use client";

import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignIn,
  SignUp,
  UserButton,
} from "@clerk/nextjs";
import {
  AppBar,
  Box,
  Button,
  Container,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";

export default function SignUpPage() {
  return (
    <ClerkProvider>
      <Container mw="100vw">
        <AppBar position="fixed" sx={{ backgroundColor: "#1A3196" }}>
          <Toolbar>
            <SchoolIcon fontSize="large" sx={{ mr: 1 }} />
            <Typography
              variant="h6"
              fontWeight={"bold"}
              sx={{
                flexGrow: 1,
              }}
            >
              Campus Critic
            </Typography>

            <Button href="/" color="inherit">
              <Typography>HOME</Typography>
            </Button>
            <Button color="inherit" href="/sign-in">
              <Typography
                sx={{
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                Login
              </Typography>
            </Button>
            <Button color="inherit" href="/sign-up">
              <Typography
                sx={{
                  color: "#FFFFFF",
                  textDecoration: "none",
                }}
              >
                Sign Up
              </Typography>
            </Button>
          </Toolbar>
        </AppBar>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          marginTop={15}
          marginBottom={5}
        >
          <Typography variant="h4" gutterBottom>
            Sign Up
          </Typography>
          <SignUp></SignUp>
        </Box>
      </Container>
    </ClerkProvider>
  );
}
