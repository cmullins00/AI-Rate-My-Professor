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

export default function SignUpPage() {
  return (
    <ClerkProvider>
      <Container mw="100vw">
        <AppBar position="fixed" sx={{ backgroundColor: "#000" }}>
          <Toolbar>
            <Typography
              variant="h6"
              sx={{
                flexGrow: 1,
              }}
            >
              Campus Critic
            </Typography>
            <Button href="/">
              <Typography sx={{ left: 2 }}>HOME</Typography>
            </Button>

            <Button color="inherit">
              <Link href="/sign-in">
                <Typography
                  sx={{
                    color: "#FFFFFF",
                    textDecoration: "none",
                    fontSize: 14,
                  }}
                >
                  {" "}
                  Login
                </Typography>
              </Link>
            </Button>
            <Button color="inherit">
              {" "}
              <Link href="/sign-up">
                <Typography
                  sx={{
                    color: "#FFFFFF",
                    textDecoration: "none",
                    fontSize: 14,
                  }}
                >
                  {" "}
                  Sign Up
                </Typography>
              </Link>
            </Button>
          </Toolbar>
        </AppBar>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          marginTop={15}
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
