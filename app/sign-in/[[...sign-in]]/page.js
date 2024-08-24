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
import React from "react";
import SchoolIcon from "@mui/icons-material/School";
import Link from "next/link";

export default function SignInPage() {
  return (
    <ClerkProvider>
      <Container
        maxWidth="100vw"
        sx={{
          background: "white",
          position: "relative",
          zIndex: 1,
        }}
      >
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
            <Button color="inherit" href="/submit">
              <Typography
                sx={{
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                Link
              </Typography>
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
                  color: "inherit",
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
            Sign In
          </Typography>
          <SignIn></SignIn>
        </Box>
      </Container>
    </ClerkProvider>
  );
}
