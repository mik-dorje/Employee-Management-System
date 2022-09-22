// import { AppBar, Box, Paper, Toolbar, Typography } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import axios from "../../api/axios";
// import UsersTable from "./UsersTable";

// const USERS_URL = "/users";

// const UserList = () => {
//   const [users, setUsers] = useState(null);

//   const fetchUsers = async () => {
//     const response = await axios.get(USERS_URL);
//     setUsers(response.data);
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   return (
//     <div>
//       <Paper
//         variant="outlined"
//         // elevation={3}
//         sx={{
//           p: 2,
//           minHeight: "90vh",
//           background: "linear-gradient(120deg, #B8C6DB, #F5F7fA)",
//         }}
//       >
//         <UsersTable users={users} setUsers={setUsers} />
//       </Paper>
//     </div>
//   );
// };

// export default UserList;

import React, { useState, useEffect } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { Button, Paper } from "@mui/material";

import UsersTable from "./UsersTable";
import axios from "../../api/axios";

const USERS_URL = "/users";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function UserList() {
  const [users, setUsers] = useState(null);

  const [searchWord, setSearchWord] = useState(null);

  const fetchUsers = async () => {
    const response = await axios.get(USERS_URL);
    setUsers(response.data);
  };

  React.useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Paper
      variant="outlined"
      // elevation={3}
      sx={{
        p: 2,
        minHeight: "90vh",
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ bgcolor: "#bf8b59" }}>
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              Members
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                // value={searchWord}
                // onChange={(e) => setTypedWord(e.target.value)}
              />
            </Search>
          </Toolbar>
        </AppBar>
      </Box>
      <UsersTable users={users} setUsers={setUsers} searchWord={searchWord} />
    </Paper>
  );
}
