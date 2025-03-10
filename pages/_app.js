import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import { colors } from "@mui/material";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Box mt={4}>
        <Component {...pageProps} />
      </Box>
    </>
  );
}

function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Link href="/" style={{ textDecoration: "none" }}>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, color: "white" }}
              style={{ userSelect: "none" }}
            >
              近場のレストラン検索
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
