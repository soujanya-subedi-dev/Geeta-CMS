import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";
import "./index.css";

const theme = createTheme({
  palette: {
    primary: { main: "#1E40AF" },
    secondary: { main: "#F59E0B" },
    background: { default: "#F9FAFB", paper: "#FFFFFF" },
    text: { primary: "#1F2937", secondary: "#4B5563" },
  },
  typography: {
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    h1: { fontFamily: "Poppins, 'Inter', sans-serif", fontWeight: 700 },
    h2: { fontFamily: "Poppins, 'Inter', sans-serif", fontWeight: 600 },
    h3: { fontFamily: "Poppins, 'Inter', sans-serif", fontWeight: 600 },
    button: { textTransform: "none", fontWeight: 600 },
  },
  shape: { borderRadius: 16 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 9999,
        },
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
