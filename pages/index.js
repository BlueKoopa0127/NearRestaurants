import Link from "next/link";
import { useEffect, useState } from "react";
import { Box, Button, Container, Stack, Typography } from "@mui/material";

export default function Home() {
  const [coords, setCoords] = useState();

  const ranges = [300, 500, 1000, 2000, 3000].map((e, i) => ({
    range: e,
    value: i + 1,
  }));

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCoords({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          });
        },
        (err) => {
          console.warn(`ERROR(${err.code}): ${err.message}`);
        }
      );
    }
  }, []);

  return (
    <Box
      sx={{
        minHeight: "50vh",
        bgcolor: "#f5f5f5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            bgcolor: "white",
            p: 4,
            borderRadius: 4,
            boxShadow: 3,
            textAlign: "center",
          }}
        >
          <Typography variant="h4" gutterBottom>
            現在地検索
          </Typography>
          <Typography variant="body1" mb={3}>
            現在地から近くのレストランを探してみましょう
          </Typography>

          <Stack spacing={2}>
            {ranges.map((e) => (
              <Button
                key={e.value}
                variant="contained"
                color="primary"
                fullWidth
                component={Link}
                href={{
                  pathname: "/result",
                  query: {
                    lat: coords?.latitude,
                    lng: coords?.longitude,
                    range: e.value,
                    start: 1,
                  },
                }}
                sx={{
                  textTransform: "none",
                  fontWeight: "bold",
                  boxShadow: 2,
                  transition: "0.3s",
                  "&:hover": {
                    boxShadow: 4,
                  },
                }}
              >
                現在位置から{e.range}m以内で検索
              </Button>
            ))}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
