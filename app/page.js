/* eslint-disable react/no-unescaped-entities */
"use client";
import {
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  Slide,
  Fade,
  Toolbar,
  Typography,
  CssBaseline,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
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
import SchoolIcon from "@mui/icons-material/School";

export default function Home() {
  const [show, setShow] = useState(false);

  const theme = createTheme({
    palette: {
      primary: {
        light: "#b8c8ff",
        main: "#1A3196",
        dark: "#051e82",
      },
      secondary: {
        main: "#f50057",
      },
      background: {
        default: "#051e82",
      },
    },
  });

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Container
          maxWidth="100vw"
          sx={{
            background: "linear-gradient(to top, #b8c8ff, #2986cc)",
            position: "relative",
            zIndex: 1,
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: 0.1,
              backgroundImage: `url(https://www.thenubianmessage.com/wp-content/uploads/2024/03/Senait-Conformity-in-College-1280x640.jpg)`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              zIndex: -1, // Ensure it's behind other content
            }}
          />
          <AppBar position="fixed" sx={{ backgroundColor: "primary.main" }}>
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
              <ClerkProvider>
                <SignedOut>
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
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </ClerkProvider>
            </Toolbar>
          </AppBar>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box
              sx={{
                textAlign: "left",
                width: { xs: "90%", s: "60%", md: "45%", lg: "40%" },
                my: { xs: 10, s: 12, md: 15, lg: 25 },
                ml: { xs: 0, s: 5, md: 10 },
              }}
            >
              <Slide in={show} direction="right" timeout={800}>
                <div>
                  <Fade in={show} timeout={1400}>
                    <Box>
                      <Typography
                        variant="h3"
                        sx={{ m: 2 }}
                        color="white"
                        fontWeight={"bold"}
                        gutterBottom
                      >
                        Navigate Classes with Reviews from Students.
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{ mx: 2, my: 3 }}
                        gutterBottom
                      >
                        Your go-to hub for discovering the best professors for
                        your courses. Whether you're looking for engaging
                        lectures, fair grading, or just want to know what to
                        expect, we've got you covered. Start your search today
                        and make informed decisions about your education.
                      </Typography>
                      <Button
                        variant="contained"
                        sx={{
                          mx: 2,
                          my: 1,
                          borderRadius: "18px",
                          backgroundColor: "primary.dark",
                        }}
                        href="aichat"
                      >
                        Get Started
                      </Button>
                    </Box>
                  </Fade>
                </div>
              </Slide>
            </Box>
            <Slide in={show} direction="right" timeout={800}>
              <div>
                <Fade in={show} timeout={1400}>
                  <Box
                    component="img"
                    sx={{
                      height: 1000,
                      width: 1000,
                      mr: 10,
                      borderRadius: "20px",
                      maxHeight: { md: 210, lg: 300, xl: 400 },
                      maxWidth: { md: 300, lg: 450, xl: 600 },
                      display: { xs: "none", s: "none", md: "flex" },
                    }}
                    alt="Rate My Professors" // Replace this pic with something else
                    src="https://theeyeopener.com/wp-content/uploads/2020/01/RateMyProf_PerniaJamshed_Jan2020-01.png"
                  />
                </Fade>
              </div>
            </Slide>
          </Grid>
        </Container>
      </CssBaseline>
    </ThemeProvider>
  );
}
