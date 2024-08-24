/* eslint-disable react/no-unescaped-entities */
"use client";

import {
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  Toolbar,
  Typography,
} from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import {
  ClerkProvider,
  SignIn,
  SignedIn,
  SignedOut,
  UserButton,
  useAuth,
} from "@clerk/nextjs";
export default function Home() {
  return (
    <Container maxWidth="100vw">
      <AppBar position="fixed" sx={{ backgroundColor: "#000" }}>
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Campus Critic
          </Typography>
          <Button  href="/" sx={{
            color: "#FFFFFF"
          }}>
            <Typography>HOME</Typography>
          </Button>
          <ClerkProvider>
            <SignedOut>
              <Button
                color="inherit"
                href="sign-in"
                sx={{
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                {" "}
                Login
              </Button>
              <Button
                color="inherit"
                href="sign-up"
                sx={{
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                {" "}
                Sign up
              </Button>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </ClerkProvider>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          textAlign: "left",
          my: 25,
          mx: 25,
          //bgcolor: "#000"
        }}
      >
        <Typography variant="h2" gutterBottom>
          Campus Critic
        </Typography>
        <Typography variant="h5">
          {""}
          Your go-to hub for discovering the best professors for your courses.
          Whether you're looking for engaging lectures, fair grading, or just
          want to know what to expect, we've got you covered. Start your search
          today and make informed decisions about your education.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          href="aichat"
        >
          {""}
          Get Started
        </Button>
      </Box>
    </Container>
  );
}
