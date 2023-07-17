"use client";
import { useState } from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  FormHelperText,
  Button,
  Typography,
} from "@mui/material";

import Select, { SelectChangeEvent } from "@mui/material/Select";

interface AddCategoryProps {
  handleSave: (
    parentCategory: string,
    categoryName: string,
    categoryDescr: string
  ) => void;
}

export default function AddCategory({ handleSave }: AddCategoryProps) {
  const [parentCategory, setParentCategory] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescr, setCategoryDescr] = useState("");
  const handleSelectCategory = (event: SelectChangeEvent) => {
    setParentCategory(event.target.value);
  };

  return (
    <>
      <Typography variant="h6">Add new category</Typography>

      <TextField
        fullWidth
        label="Name"
        variant="outlined"
        margin="normal"
        helperText="Name of the category"
        onChange={(e) => setCategoryName(e.target.value)}
      />

      <TextField
        fullWidth
        label="Description"
        multiline
        minRows={4}
        helperText="Description"
        onChange={(e) => setCategoryDescr(e.target.value)}
      />

      <FormControl fullWidth margin="normal">
        <InputLabel>Parent Category</InputLabel>
        <Select
          value={parentCategory}
          label="Parent Category"
          onChange={handleSelectCategory}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        <FormHelperText>
          Select the parent category to create a subtree
        </FormHelperText>
      </FormControl>

      <Button
        variant="contained"
        sx={{ marginTop: "35px" }}
        onClick={() => handleSave(parentCategory, categoryName, categoryDescr)}
      >
        Add new Category
      </Button>
    </>
  );
}
