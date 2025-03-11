import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { CssBaseline, Container } from "@mui/material";

export default function App({ Component, pageProps }) {
  return (
    <>
      <CssBaseline />
      <Header />
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Component {...pageProps} />
      </Container>
    </>
  );
}

function Header() {
  return (
    <AppBar position="static" elevation={2} sx={{ bgcolor: "#1976d2" }}>
      <Toolbar>
        <Link href="/" passHref style={{ textDecoration: "none", flexGrow: 1 }}>
          <Typography
            variant="h6"
            sx={{
              color: "white",
              fontWeight: "bold",
              userSelect: "none",
              ":hover": { opacity: 0.85 },
            }}
          >
            近場のレストラン検索
          </Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
}
