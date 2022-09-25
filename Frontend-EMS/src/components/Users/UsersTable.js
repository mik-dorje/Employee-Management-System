import React, { useContext, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow, { tableRowClasses } from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DoneIcon from "@mui/icons-material/Done";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import {
  ButtonGroup,
  IconButton,
  Input,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import axios from "../../api/axios";
import AuthContext from "../../context/AuthProvider";

const USERS_URL = "/users";

const DELETE_URL = "/delete";
const UPDATE_URL = "/patch";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: " #525252",
    color: "white",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
    // fontSize: 10,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function UsersTable({ users, setUsers, typedWord }) {
  const [editLayerId, setEditLayerId] = useState(null);
  const [editUsername, setEditUsername] = useState("");
  const [editFirstname, setEditFirstname] = useState("");
  const [editLastname, setEditLastname] = useState("");
  const [editPhone, setEditPhone] = useState("");
  // const [editUsername, setEditUsername] = useState("");

  const [tableData, setTableData] = useState(null);

  const { auth, setAuth } = useContext(AuthContext);

  const roles = auth?.foundUser?.roles;


  const tableHeaders = [
    "Username",
    "Firstname",
    "Lastname",
    "Phone",
    "Status",
    "Update",
  ];

  const handleEdit = (id) => {
    console.log(id);
    setEditLayerId(id);
  };

  const handleDone = async (id) => {
    console.log(id, editUsername, editFirstname, editLastname, editPhone);
    try {
      const response = await axios.patch(
        UPDATE_URL,
        JSON.stringify({
          id,
          editUsername,
          editFirstname,
          editLastname,
          editPhone,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      // TODO: remove console.logs before deployment
      console.log(JSON.stringify(response?.data));
    } catch (err) {
      console.log(err);
    }

    // setEditUsername("");
    setEditLayerId(null);
  };

  const handleDelete = async (id) => {
    console.log(id);
    try {
      const response = await axios.delete(
        USERS_URL,
        JSON.stringify({
          id,
          roles,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      console.log(JSON.stringify(response?.data?.outcome));
    } catch (err) {
      console.log(err.message);
    }
    setUsers(users?.filter((user) => user._id !== id));
  };

  // handleSearch
  useEffect(() => {
    setTableData(users);
    if (typedWord) {
      const resultsArray = users?.filter(
        (user) =>
          user?.username?.includes(typedWord) ||
          user?.firstname?.includes(typedWord) ||
          user?.lastname?.includes(typedWord) ||
          user?.phone?.includes(typedWord) ||
          user?.roles?.includes(typedWord)
      );
      setTableData(resultsArray);
    }
  }, [typedWord, users]);

  return (
    <TableContainer component={Paper} sx={{ my: 1 }}>
      <Table sx={{ minWidth: 300 }} size="small" aria-label="customized table">
        <TableHead>
          <TableRow>
            {tableHeaders.map((tableHeader) => (
              <StyledTableCell align="left">{tableHeader}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {tableData?.map((user) =>
            editLayerId === user?._id ? (
              <StyledTableRow key={user._id}>
                <StyledTableCell align="left">
                  <input
                    name="username"
                    value={editUsername}
                    onChange={(e) => setEditUsername(e.target.value)}
                    style={{ width: "80px" }}
                  />
                </StyledTableCell>
                <StyledTableCell align="left">
                  <input
                    name="firstname"
                    value={editFirstname}
                    onChange={(e) => setEditFirstname(e.target.value)}
                    style={{ width: "80px" }}
                  />
                </StyledTableCell>
                <StyledTableCell align="left">
                  <input
                    name="lastname"
                    value={editLastname}
                    onChange={(e) => setEditLastname(e.target.value)}
                    style={{ width: "80px" }}
                  />
                </StyledTableCell>
                <StyledTableCell align="left">
                  <input
                    name="phone"
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    style={{ width: "80px" }}
                  />
                </StyledTableCell>
                <StyledTableCell align="left">
                  {user?.roles?.includes("Admin") ? "Admin" : "User"}
                </StyledTableCell>
                <StyledTableCell align="left">
                  <ButtonGroup
                    size="small"
                    variant="outlined"
                    aria-label="outlined button group"
                  >
                    <IconButton
                      sx={{ width: "40px", height: "40px" }}
                      onClick={(e) => handleDone(user._id)}
                    >
                      <DoneIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      sx={{ width: "40px", height: "40px" }}
                      onClick={(e) => handleDelete(user._id)}
                    >
                      <DeleteOutlinedIcon fontSize="small" />
                    </IconButton>
                  </ButtonGroup>
                </StyledTableCell>
              </StyledTableRow>
            ) : (
              <StyledTableRow key={user.name}>
                <StyledTableCell align="left">{user.username}</StyledTableCell>
                <StyledTableCell align="left">{user.firstname}</StyledTableCell>
                <StyledTableCell align="left">{user.lastname}</StyledTableCell>
                <StyledTableCell align="left">{user.phone}</StyledTableCell>
                <StyledTableCell align="left">
                  {user?.roles?.includes("Admin") ? "Admin" : "User"}
                </StyledTableCell>
                <StyledTableCell align="left">
                  <ButtonGroup
                    size="small"
                    variant="outlined"
                    aria-label="outlined button group"
                  >
                    <IconButton
                      sx={{ width: "40px", height: "40px" }}
                      onClick={(e) => handleEdit(user._id)}
                    >
                      <ModeEditOutlineOutlinedIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      sx={{ width: "40px", height: "40px" }}
                      onClick={(e) => handleDelete(user._id)}
                    >
                      <DeleteOutlinedIcon fontSize="small" />
                    </IconButton>
                  </ButtonGroup>
                </StyledTableCell>
              </StyledTableRow>
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
