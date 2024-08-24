"use client";
import { useState } from "react";
import { Box, Button, TextField, Stack, Typography } from "@mui/material";

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

  return (
    <Box
      width="100vw"
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
        p={2}
        spacing={3}
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
          disabled={loading || !url}
        >
          {loading ? "Submitting..." : "Submit"}
        </Button>
        {message && <Typography>{message}</Typography>}
      </Stack>
    </Box>
  );
}
