import * as React from "react";
import GlobalStyles from "@mui/joy/GlobalStyles";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Divider from "@mui/joy/Divider";
import IconButton from "@mui/joy/IconButton";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton, { listItemButtonClasses } from "@mui/joy/ListItemButton";
import ListItemContent from "@mui/joy/ListItemContent";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import QuestionAnswerRoundedIcon from "@mui/icons-material/QuestionAnswerRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import SupportRoundedIcon from "@mui/icons-material/SupportRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import Button from "@mui/joy/Button";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { toggleSidebar } from "../utils/utils";

export default function Sidebar() {
  const navigate = useNavigate();
  const { user, logout, loading } = useAuth();
  const [userData, setUserData] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    if (user) {
      setUserData(user);
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const closeSidebar = () => {
    setOpen(false);
  };
  const handleClickOutside = (event) => {
    if (open && !event.target.closest(".Sidebar")) {
      closeSidebar();
    }
  };

  React.useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [open]);

  return (
    <>
      <Sheet
        className="Sidebar"
        sx={{
          position: { xs: "fixed", md: "sticky" },
          transform: {
            xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))",
            md: "none",
          },
          transition: "transform 0.4s, width 0.4s",
          zIndex: 10000,
          height: "100dvh",
          width: "var(--Sidebar-width)",
          top: 0,
          p: 2,
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          borderRight: "1px solid",
          borderColor: "divider",
        }}
      >
        <GlobalStyles
          styles={(theme) => ({
            ":root": {
              "--Sidebar-width": "220px",
              [theme.breakpoints.up("lg")]: {
                "--Sidebar-width": "240px",
              },
            },
          })}
        />
        <Box
          className="Sidebar-overlay"
          sx={{
            position: "fixed",
            zIndex: 9998,
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            opacity: "var(--SideNavigation-slideIn)",
            backgroundColor: "var(--joy-palette-background-backdrop)",
            transition: "opacity 0.4s",
            transform: {
              xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))",
              lg: "translateX(-100%)",
            },
          }}
          onClick={closeSidebar}
        />
        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            justifyContent: "space-between",
            alignItems: "center",
            p: 2,
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        >
          <Typography level="title-lg">Sidebar</Typography>
          <IconButton
            size="sm"
            variant="plain"
            color="neutral"
            onClick={toggleSidebar}
          >
            <CloseRoundedIcon />
          </IconButton>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            alignItems: "center",
            mt: 2,
          }}
        >
          {user ? (
            <Avatar
              variant="outlined"
              size="lg"
              src={
                user.profilePicture
                  ? `http://localhost:5000/${user.profilePicture}`
                  : "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
              }
              sx={{
                width: 100, // Increase the width
                height: 100, // Increase the height
                border: "3px solid", // Add a border
                borderColor: "primary.500", // Use a primary color for the border
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)", // Add a shadow effect
              }}
            />
          ) : (
            <Button
              variant="solid"
              color="neutral"
              onClick={() => navigate("/login")}
              sx={{
                width: 100,
                height: 100,
                borderRadius: "50%",
                backgroundColor: "black",
              }}
            >
              Sign In
            </Button>
          )}
          {user && (
            <React.Fragment>
              <Typography level="title-lg" sx={{ textAlign: "center" }}>
                {user?.name || "User          Name"}
              </Typography>
              <Typography level="body-sm" sx={{ textAlign: "center" }}>
                {user?.email || "user@example.com"}
              </Typography>
            </React.Fragment>
          )}
        </Box>
        <Box
          sx={{
            minHeight: 0,
            overflow: "hidden auto",
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            [`& .${listItemButtonClasses.root}`]: {
              gap: 1.5,
            },
          }}
        >
          <List
            size="sm"
            sx={{
              gap: 1,
              "--List-nestedInsetStart": "30px",
              "--ListItem-radius": (theme) => theme.vars.radius.sm,
            }}
          >
            <ListItem>
              <ListItemButton onClick={() => navigate("/dashboard")}>
                <HomeRoundedIcon />
                <ListItemContent>
                  <Typography level="title-sm">Home</Typography>
                </ListItemContent>
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton>
                <DashboardRoundedIcon onClick={() => navigate("/dashboard")} />
                <ListItemContent>
                  <Typography level="title-sm">Dashboard</Typography>
                </ListItemContent>
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton
                onClick={() =>
                  user ? navigate("/profile") : navigate("/login")
                }
              >
                <GroupRoundedIcon />
                <ListItemContent>
                  <Typography level="title-sm">User Profile</Typography>
                </ListItemContent>
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton
                role="menuitem"
                component="a"
                href="/joy-ui/getting-started/templates/order-dashboard/"
              >
                <ShoppingCartRoundedIcon />
                <ListItemContent>
                  <Typography level="title-sm">Orders</Typography>
                </ListItemContent>
              </ListItemButton>
            </ListItem>
          </List>
          <List
            size="sm"
            sx={{
              mt: "auto",
              flexGrow: 0,
              "--ListItem-radius": (theme) => theme.vars.radius.sm,
              "--List-gap": "8px",
              mb: 2,
            }}
          >
            <ListItem>
              <ListItemButton
                onClick={() =>
                  user ? navigate("/support") : navigate("/login")
                }
              >
                <SupportRoundedIcon />
                Support
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton
                onClick={() =>
                  user ? navigate("/settings") : navigate("/login")
                }
              >
                <SettingsRoundedIcon />
                Settings
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
        <Divider />
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          {user ? (
            <Avatar
              variant="outlined"
              size="sm"
              src={
                user.profilePicture
                  ? `http://localhost:5000/${user.profilePicture}`
                  : "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
              }
            />
          ) : (
            <Button
              variant="solid"
              color="neutral"
              onClick={() => navigate("/login")}
              sx={{
                width: "100%",
                height: 40,
                borderRadius: 2,
                fontSize: 16,
                fontWeight: 600,
                textTransform: "capitalize",
                backgroundColor: "black",
                color: "white",
              }}
            >
              Sign In
            </Button>
          )}
          <Box sx={{ minWidth: 0, flex: 1 }}>
            {user && (
              <React.Fragment>
                <Typography level="title-sm">
                  {user?.name || "User          Name"}
                </Typography>
                <Typography level="body-xs">
                  {user?.email || "user@example.com"}
                </Typography>
              </React.Fragment>
            )}
          </Box>
          {user && (
            <IconButton
              size="sm"
              variant="plain"
              color="neutral"
              onClick={handleLogout}
            >
              <LogoutRoundedIcon />
            </IconButton>
          )}
        </Box>
      </Sheet>
    </>
  );
}
