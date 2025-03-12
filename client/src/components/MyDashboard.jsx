import * as React from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Sidebar from "./home/sidebar";
import Header from "./Header";
import { useAuth } from "../context/AuthContext";
import Typography from "@mui/joy/Typography";
import { useNavigate } from "react-router-dom";
import Dashboard from "./dashboard/Dashboard";

export default function MyDashboard() {
  const { user, loading, checkAuthStatus } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />

      <Box sx={{ display: "flex", minHeight: "100dvh" }}>
        <Sidebar />
        <Header />
        <Box
          component="main"
          className="MainContent"
          sx={{
            pt: { xs: "calc(12px + var(--Header-height))", md: 3 },
            pb: { xs: 2, sm: 2, md: 3 },
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minWidth: 0,
            height: "100dvh",
            gap: 1,
            overflow: "auto",
          }}
        >
          <Dashboard />
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
