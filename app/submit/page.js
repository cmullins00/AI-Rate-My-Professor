"use client";
import { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Stack,
  TextField,
  Container,
  Grid,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  ClerkProvider,
  SignIn,
  SignedIn,
  SignedOut,
  UserButton,
  useAuth,
} from "@clerk/nextjs";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import SchoolIcon from "@mui/icons-material/School";

export default function SubmitPage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      if (response.ok) {
        setMessage("Successfully submitted the URL and scraped data");
      } else {
        setMessage("Failed to scrape data from the URL.");
      }
    } catch (error) {
      setMessage("An error occurred while submiting the URL.");
    } finally {
      setLoading(false);
      setUrl("");
    }
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: "#1A3196",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container
        maxWidth="100vw"
        sx={{
          background: "linear-gradient(to top, #b8c8ff, #2986cc)",
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
        <Box
          width="100%"
          height="100vh"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Stack
            direction="column"
            width="500px"
            height="auto"
            border="1px solid black"
            alignItems="center"
            p={2}
            spacing={3}
            sx={{ backgroundColor: "white" }}
          >
            <Typography variant="h4">Submit Rate My Professor URL</Typography>
            <TextField
              label="Professor's Page URL"
              fullWidth
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <Button
              variant="contained"
              onClick={handleSubmit}
              fullWidth
              sx={{
                borderRadius: "16px",
                maxWidth: "50%",
              }}
              disabled={loading || !url}
            >
              {loading ? "Submitting..." : "Submit"}
            </Button>
            {message && <Typography>{message}</Typography>}
          </Stack>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
