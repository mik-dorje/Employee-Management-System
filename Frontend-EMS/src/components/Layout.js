import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";

import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import SupervisedUserCircleOutlinedIcon from "@mui/icons-material/SupervisedUserCircleOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import TextSnippetOutlinedIcon from "@mui/icons-material/TextSnippetOutlined";
import Groups2OutlinedIcon from "@mui/icons-material/Groups2Outlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import LogoutIcon from "@mui/icons-material/Logout";
import ListItemText from "@mui/material/ListItemText";

import { Link, Outlet } from "react-router-dom";

import { Avatar } from "@mui/material";

import logo from "../images/logo.png";
import avatarImg from "../images/toon.jpg";
import AuthContext from "../context/AuthProvider";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer() {
  // const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const { auth, setAuth } = React.useContext(AuthContext);

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    setAuth("");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar
          sx={{
            backgroundColor: "#0d1017",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              width: 50,
              height: 50,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            noWrap
            component="div"
            // sx={{ ...(open && { padding: "150" }) }}
          >
            Employee Managment System
          </Typography>

          <Avatar sx={{ backgroundColor: "#bf8b59" }}>
            {auth?.user?.charAt(0)}
          </Avatar>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader
          sx={{
            backgroundColor: "#0d1017",
            color: "white",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box
            component="img"
            sx={{
              width: 40,
              height: 40,
              marginLeft: "70px",
              ...(!open && { display: "none" }),
            }}
            alt="logo"
            src={logo}
          />
          <IconButton
            onClick={handleDrawerOpen}
            sx={{ color: "white", width: 50, height: 50 }}
          >
            <MenuIcon />
          </IconButton>
        </DrawerHeader>

        {/* <Divider /> */}

        <Box
          sx={{
            display: "flex",
            height: "100vh",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <List>
            {/*General Section */}
            <Box
              sx={{
                backgroundColor: "#bf8b59",
                minHeight: 48,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                // justifyContent: open ? "initial" : "center",
                px: 2,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  alignItem: "center",
                  justifyContent: "center",
                }}
              >
                <SupervisedUserCircleOutlinedIcon />
              </ListItemIcon>

              <Typography sx={{ color: "#424242", opacity: open ? 1 : 0 }}>
                General
              </Typography>
            </Box>
            <Divider />

            <Link to="/home">
              <ListItemButton
                key="home"
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <HomeOutlinedIcon />
                </ListItemIcon>

                <ListItemText
                  primary={"Home"}
                  sx={{ color: "#424242", opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </Link>

            <Link to="/notice">
              <ListItemButton
                key="home"
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <TextSnippetOutlinedIcon />
                </ListItemIcon>

                <ListItemText
                  primary={"Notice"}
                  sx={{ color: "#424242", opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </Link>

            <Divider />
            {/* Admin Section */}
            <Box
              sx={{
                backgroundColor: "#bf8b59",
                minHeight: 48,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                // justifyContent: open ? "initial" : "center",
                px: 2,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  alignItem: "center",
                  justifyContent: "center",
                }}
              >
                <AdminPanelSettingsOutlinedIcon />
              </ListItemIcon>

              <Typography sx={{ color: "#424242", opacity: open ? 1 : 0 }}>
                Admin
              </Typography>
            </Box>
            <Link to="/dashboard">
              <ListItemButton
                key={"text"}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <GridViewOutlinedIcon />
                </ListItemIcon>

                <ListItemText
                  primary={"Dashboard"}
                  sx={{ color: "#424242", opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </Link>
            <Link to="/userlist">
              <ListItemButton
                key={"userlist"}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <Groups2OutlinedIcon />
                </ListItemIcon>

                <ListItemText
                  primary={"Users"}
                  sx={{ color: "#424242", opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </Link>
            <Divider />
            <Divider />
          </List>
          <List>
            <Box
              sx={{
                // bgcolor: "green",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Avatar
                alt={auth?.user}
                src={avatarImg}
                sx={{
                  width: open ? 75 : 60,
                  height: open ? 75 : 60,
                  border: "1px solid gray",
                }}
              />
            </Box>
            <Box
              sx={{
                textAlign: "center",
                bgcolor: "#bf8b59",
              }}
            >
              <Typography
                sx={{
                  color: "#424242",

                  my: 1,
                  opacity: open ? 1 : 0,
                }}
              >
                Signed as:
                {auth?.foundUser?.roles.includes("Admin") ? " Admin" : " User"}
              </Typography>
            </Box>
            <ListItemButton
              key={"text"}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2,
                backgroundColor: "#bf8b59",
              }}
              onClick={handleLogout}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText
                primary={"Logout"}
                sx={{ color: "#424242", opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1 }}>
        <DrawerHeader />
        <Typography
          paragraph
          sx={{
            p: 1,
            backgroundColor: "#efefef",
            minHeight: `calc(100vh - 64px)`,
          }}
        >
          <Outlet />
        </Typography>
      </Box>
    </Box>
  );
}
