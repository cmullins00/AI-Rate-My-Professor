"use client";

import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignIn,
  UserButton,
} from "@clerk/nextjs";
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import Link from "next/link";

export default function SignInPage() {
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
              <Typography>HOME</Typography>
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
            Sign In
          </Typography>
          <SignIn></SignIn>
        </Box>
      </Container>
    </ClerkProvider>
  );
}
