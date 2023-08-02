"use client";
import { useState, useEffect } from "react";
import { IconButton, InputBase, Paper, Divider, Tooltip } from "@mui/material";

import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import InfoIcon from "@mui/icons-material/Info";

interface SearchProps {
  handleSearch: (searchValue: string) => void;
  reset?: boolean;
  width?: number;
  isStandAlone?: boolean;
}

export default function Search({
  handleSearch,
  reset,
  width = 400,
  isStandAlone = true,
}: SearchProps) {
  const [searchText, setSearchText] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.value) {
      handleSearch("");
    }
    setSearchText(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch(searchText);
    }
    if (event.key === "Escape") {
      setSearchText("");
      handleSearch("");
    }
  };

  const handleClearSearch = () => {
    setSearchText("");
    handleSearch("");
  };

  useEffect(() => {
    if (reset) setSearchText(""); //handleClearSearch();
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

  const style = isStandAlone
    ? {
        p: "2px 5px",
        display: "flex",
        alignItems: "center",
        maxWidth: width,
        marginLeft: "auto",
        marginBottom: "10px",
      }
    : {
        maxWidth: width,
        display: "flex",
        alignItems: "center",
        marginLeft: "auto",
        background: "inherit",
      };

  return (
    <Paper component="form" elevation={isStandAlone ? 1 : 0} sx={style}>
      <Tooltip title={<InfoTitle />}>
        <IconButton>
          <InfoIcon />
        </IconButton>
      </Tooltip>
      <InputBase
        sx={{ ml: 1, flex: 1, borderBottom: "1px solid" }}
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
