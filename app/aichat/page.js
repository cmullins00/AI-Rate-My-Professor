"use client";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  AppBar,
  Box,
  Button,
  TextField,
  Stack,
  Container,
  Grid,
  Icon,
  Toolbar,
  Typography,
  CssBaseline,
} from "@mui/material";
import {
  ClerkProvider,
  SignIn,
  SignedIn,
  SignedOut,
  UserButton,
  useAuth,
} from "@clerk/nextjs";
import SchoolIcon from "@mui/icons-material/School";
import Markdown from "react-markdown";

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello! I'm the Rate My Professor support assistant. How may I help you today?",
    },
  ]);
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);

  const sendMessage = async () => {
    setMessages((messages) => [
      ...messages,
      { role: "user", content: message },
      { role: "assistant", content: "" },
    ]);

    setMessage("");

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([...messages, { role: "user", content: message }]),
    }).then(async (res) => {
      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      let result = "";
      return reader.read().then(function processText({ done, value }) {
        if (done) {
          return result;
        }
        const text = decoder.decode(value || new Uint8Array(), {
          stream: true,
        });
        setMessages((messages) => {
          let lastMessage = messages[messages.length - 1];
          let otherMessages = messages.slice(0, -1);
          return [
            ...otherMessages,
            { ...lastMessage, content: lastMessage.content + text },
          ];
        });

        return reader.read().then(processText);
      });
    });
  };

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
        light: "#b8c8ff",
        text: "#344db8",
        main: "#1A3196",
        dark: "#051e82",
      },
      secondary: {
        main: "#2692bb",
        gold: "#c7bd2d",
      },
      background: {
        default: "#b8c8ff",
      },
    },
  });

  // Scroll to the bottom of the container
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
              opacity: 0.15,
              backgroundImage: `url(https://pixahive.com/wp-content/uploads/2021/03/Rainy-pattern-background-wallpaper-368138-pixahive.jpg)`,
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
              sx={{
                width: {
                  xs: "90%",
                  s: "75%",
                  md: "60%",
                  lg: "50%",
                  xlg: "37%",
                },
                mt: 2,
              }}
              height="80%"
              border="3px solid"
              borderColor="primary.light"
              borderRadius={6}
              p={2}
              spacing={2}
              bgcolor="white"
            >
              <Stack
                direction="column"
                flexGrow={1}
                overflow={"auto"}
                maxHeight={"100%"}
                spacing={2}
              >
                {messages.map((message, index) => (
                  <Box
                    key={index}
                    display="flex"
                    justifyContent={
                      message.role === "assistant" ? "flex-start" : "flex-end"
                    }
                  >
                    <Box
                      color="white"
                      sx={
                        message.role === "assistant"
                          ? {
                              borderBottomLeftRadius: 0,
                              borderBottomRightRadius: 16,
                              borderTopLeftRadius: 16,
                              borderTopRightRadius: 16,
                              backgroundColor: "#d9d9d9",
                              color: "black",
                            }
                          : {
                              borderBottomLeftRadius: 16,
                              borderBottomRightRadius: 0,
                              borderTopLeftRadius: 16,
                              borderTopRightRadius: 16,
                              backgroundColor: "secondary.main",
                            }
                      }
                      borderRadius={16}
                      p={3}
                    >
                      <Typography component="div" style={{ lineHeight: 1.5 }}>
                        <Markdown>{message.content}</Markdown>
                      </Typography>
                    </Box>
                  </Box>
                ))}
                <div ref={messagesEndRef} />
              </Stack>
              <Stack direction="row" spacing={2}>
                <TextField
                  label="Ask a question..."
                  fullWidth
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      sendMessage();
                    }
                  }}
                />
                <Button variant="contained" onClick={sendMessage}>
                  Send
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Container>
      </CssBaseline>
    </ThemeProvider>
  );
}
