"use client";
import { useState } from "react";
import { IconButton, InputBase, Paper } from "@mui/material";

// import styles from "./adminDrawer.module.css";

import SearchIcon from "@mui/icons-material/Search";

interface SearchProps {
  handleSearch: (searchValue: string) => void;
}

export default function Search({ handleSearch }: SearchProps) {
  const [searchText, setSearchText] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent page refresh
      handleSearch(searchText);
    }
  };

  return (
    <Paper
      component="form"
      sx={{
        p: "2px 5px",
        display: "flex",
        alignItems: "center",
        width: 400,
        marginLeft: "auto",
        marginBottom: "10px",
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search"
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <IconButton
        type="button"
        sx={{ p: "10px" }}
        onClick={() => handleSearch(searchText)}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
