"use client";
import { useState, useEffect } from "react";
import { IconButton, InputBase, Paper, Divider, Tooltip } from "@mui/material";

import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import InfoIcon from "@mui/icons-material/Info";

interface SearchProps {
  handleSearch: (searchValue: string) => void;
  reset: boolean;
}

export default function Search({ handleSearch, reset }: SearchProps) {
  const [searchText, setSearchText] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch(searchText);
    }
    if (event.key === "Escape") {
      handleClearSearch();
    }
  };

  const handleClearSearch = () => {
    setSearchText("");
    handleSearch("");
  };

  useEffect(() => {
    if (reset) handleClearSearch();
  }, [reset]);

  const InfoTitle = () => {
    return (
      <>
        Press "Enter" to trigger search
        <br />
        Press "Esc" to clear the search
      </>
    );
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
      <Tooltip title={<InfoTitle />}>
        <IconButton>
          <InfoIcon />
        </IconButton>
      </Tooltip>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search"
        value={searchText}
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

      {searchText && (
        <>
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton
            color="primary"
            sx={{ p: "10px" }}
            onClick={() => handleClearSearch()}
          >
            <ClearIcon />
          </IconButton>
        </>
      )}
    </Paper>
  );
}
