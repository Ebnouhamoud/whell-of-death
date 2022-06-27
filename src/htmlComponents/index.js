import React from "react";
import { useState } from "react";
import UsersTable from "./table";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import useStore from "../zoustan";

export default function HtmlContainer() {
  const users = useStore((state) => state.users);
  const removeUser = useStore((state) => state.removeUser);
  const changeCount = useStore((state) => state.changeCount);
  return (
    <Box
      className="App"
      style={{
        display: "flex",
        flexDirection: "column-reverse",
        gap: "24px",
        zIndex: -1,
        width: "500px",
      }}
    >
      <Box
        style={{
          display: "flex",
          flexDirection: "column-reverse",
          gap: "24px",
          zIndex: 3,
        }}
      >
        
        <UsersTable
          users={users}
          removeUser={removeUser}
          changeCount={changeCount}
        />
        <Input />
      </Box>
    </Box>
  );
}

const Input = () => {
  const [userInput, setUserInput] = useState("");
  const addUser = useStore((state) => state.addUser);
  return (
    <Box style={{ display: "flex", gap: "10px" }}>
      <TextField
        helperText="Curse Someone"
        id="demo-helper-text-aligned"
        label="Name"
        InputProps={{ style: { fontFamily: "Saira Stencil One" } }}
        InputLabelProps={{ style: { fontFamily: "Saira Stencil One" } }}
        FormHelperTextProps={{ style: { fontFamily: "Saira Stencil One" } }}
        style={{ flexGrow: "1" }}
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />
      <Button
        variant="contained"
        style={{ flexGrow: "1", height: "55px" }}
        onClick={() => {
          setUserInput("");
          addUser(userInput);
        }}
      >
        <FontAwesomeIcon icon={faUserPlus} />
      </Button>
    </Box>
  );
};
