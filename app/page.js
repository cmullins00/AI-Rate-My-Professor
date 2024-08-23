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

export default function Home() {
  return (
    <Container maxWidth="100vw">
      <AppBar postion="static " sx={{ backgroundColor: "3f51b5" }}>
        <Toolbar>
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
            }}
          >
            Rate My Prof
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          textAlign: "center",

          my: 25,
        }}
      >
        <Typography variant="h2" gutterBottom>
          Welcome to Ai Rate My Professor
        </Typography>
        <Typography variant="h5" gutterBottom>
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
