import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
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

const DELETE_URL = "/delete";
const UPDATE_URL = "/patch";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: " #525252",
    color: "white",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 15,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function UsersTable({ users, setUsers, searchWord }) {
  const [editLayerId, setEditLayerId] = useState(null);
  const [editUsername, setEditUsername] = useState("");
  const [editFirstname, setEditFirstname] = useState("");
  const [editLastname, setEditLastname] = useState("");
  const [editPhone, setEditPhone] = useState("");
  // const [editUsername, setEditUsername] = useState("");

  const [tableData, setTableData] = useState({ ...users });

  console.log(tableData);

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
      const response = await axios.delete(DELETE_URL, {
        body: JSON.stringify({ id }),
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      console.log(JSON.stringify(response?.data));
    } catch (err) {
      console.log(err.message);
    }
    setUsers(users?.filter((user) => user._id !== id));
  };

  // handleSearch;
  if (searchWord) {
    setTableData(users?.filter((user) => user.firstname === searchWord));
  }

  return (
    <TableContainer component={Paper} sx={{ my: 2 }}>
      <Table sx={{ minWidth: 300 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {tableHeaders.map((tableHeader) => (
              <StyledTableCell align="left">{tableHeader}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {users?.map((user) =>
            editLayerId === user._id ? (
              <StyledTableRow key={user._id}>
                <StyledTableCell align="left">
                  <input
                    name="username"
                    value={editUsername}
                    onChange={(e) => setEditUsername(e.target.value)}
                    style={{ width: "100px" }}
                  />
                </StyledTableCell>
                <StyledTableCell align="left">
                  <input
                    name="firstname"
                    value={editFirstname}
                    onChange={(e) => setEditFirstname(e.target.value)}
                    style={{ width: "100px" }}
                  />
                </StyledTableCell>
                <StyledTableCell align="left">
                  <input
                    name="lastname"
                    value={editLastname}
                    onChange={(e) => setEditLastname(e.target.value)}
                    style={{ width: "100px" }}
                  />
                </StyledTableCell>
                <StyledTableCell align="left">
                  <input
                    name="phone"
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    style={{ width: "100px" }}
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
                    <IconButton onClick={(e) => handleDone(user._id)}>
                      <DoneIcon fontSize="small" />
                    </IconButton>
                    <IconButton onClick={(e) => handleDelete(user._id)}>
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
                    <IconButton onClick={(e) => handleEdit(user._id)}>
                      <ModeEditOutlineOutlinedIcon fontSize="small" />
                    </IconButton>
                    <IconButton onClick={(e) => handleDelete(user._id)}>
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
