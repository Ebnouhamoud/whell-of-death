import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserXmark,
  faAngleDown,
  faAngleUp,
} from "@fortawesome/free-solid-svg-icons";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#242039",
    color: theme.palette.common.white,
    fontFamily: "Saira Stencil One",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 18,
    paddingTop: 0,
    paddingBottom: 0,
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

export default function UsersTable({ users, removeUser, changeCount }) {
  return (
    <div style={{ width: "500px" }}>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="right"> Count </StyledTableCell>
              <StyledTableCell align="right"> Spare User </StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {users.map((row, index) => (
              <StyledTableRow
                key={row.name + index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <StyledTableCell component="th" scope="row">
                  <span style={{ fontFamily: "Saira Stencil One" }}>
                    {row.name}
                  </span>
                </StyledTableCell>
                <StyledTableCell align="right" width="70px">
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      alignItems: "center",
                      width: "60px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Button onClick={() => changeCount(index, "plus")}>
                        <FontAwesomeIcon icon={faAngleUp} />
                      </Button>
                      <Button onClick={() => changeCount(index, "negative")}>
                        <FontAwesomeIcon icon={faAngleDown} />
                      </Button>
                    </div>
                    <span
                      style={{
                        fontFamily: "Saira Stencil One",
                        fontSize: "20px",
                      }}
                    >
                      {row.count}
                    </span>
                  </div>
                </StyledTableCell>
                <StyledTableCell
                  align="right"
                  onClick={() => removeUser(index)}
                >
                  <Button variant="outlined" color="error">
                    <FontAwesomeIcon icon={faUserXmark} />
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
