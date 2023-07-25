"use client";
import { useState, useEffect } from "react";
import {
  TextField,
  FormHelperText,
  Button,
  Typography,
  Autocomplete,
  AutocompleteInputChangeReason,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { ICategories } from "@/types/categoriesTypes";

interface AddCategoryProps {
  handleSave?: (
    parentCategory: number | null,
    categoryName: string,
    categoryDescr: string,
    showType: string
  ) => void;
  handleUpdate?: (
    parentCategory: number | null,
    categoryName: string,
    categoryDescr: string,
    categoryId: number,
    showType: string
  ) => void;
  isUpdateCategory?: boolean;
  data?: ICategories | undefined;
  categories: ICategories[];
}

export default function AddCategory({
  handleSave,
  handleUpdate,
  isUpdateCategory,
  data,
  categories,
}: AddCategoryProps) {
  const [parentCategory, setParentCategory] = useState(
    isUpdateCategory && data ? data.parent_category_id : null
  );
  const [categoryName, setCategoryName] = useState(
    isUpdateCategory && data ? data.category_name : ""
  );
  const [categoryDescr, setCategoryDescr] = useState(
    isUpdateCategory && data ? data.category_description : ""
  );
  const [categoryId] = useState(
    isUpdateCategory && data ? data.category_id : null
  );
  const [showType, setShowType] = useState(
    isUpdateCategory && data ? data.category_show_type.toString() : "0"
  ); //0 for products | 1 for subcategories

  const defaultAutoSelectOption = { category_id: null, category_name: "None" };
  const autoCompleteOptions = categoryId
    ? categories.filter((category) => category.category_id !== categoryId)
    : [defaultAutoSelectOption, ...categories];

  const handleSelectCategory = (
    event: React.ChangeEvent<unknown>,
    value: string,
    reason: AutocompleteInputChangeReason
  ) => {
    if (reason === "input") {
      setParentCategory(parseInt(value));
    }
  };

  const selectedOption = categories.find(
    (option) => option.category_id === parentCategory
  );

  const reset = () => {
    setParentCategory(null);
    setCategoryName("");
    setCategoryDescr("");
    setShowType("0");
  };

  useEffect(() => {
    if (!isUpdateCategory) reset();
  }, [categories]);

  return (
    <>
      {!isUpdateCategory && (
        <Typography variant="h6">Add new category</Typography>
      )}

      <TextField
        fullWidth
        label="Name*"
        variant="outlined"
        margin="normal"
        value={categoryName}
        helperText="Name of the category (Required)"
        // defaultValue={isUpdateCategory && categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
      />

      <TextField
        sx={{ margin: "10px 0" }}
        fullWidth
        label="Description"
        multiline
        value={categoryDescr || ""}
        minRows={4}
        // defaultValue={isUpdateCategory && categoryDescr}
        onChange={(e) => setCategoryDescr(e.target.value)}
      />

      <Autocomplete
        sx={{ marginTop: "20px" }}
        getOptionLabel={(option) => option.category_name}
        // options={categories}
        options={autoCompleteOptions}
        autoHighlight
        value={selectedOption || defaultAutoSelectOption}
        onChange={(_, newValue) => {
          if (newValue) {
            setParentCategory(newValue.category_id);
          }
        }}
        onInputChange={handleSelectCategory}
        renderInput={(params) => (
          <TextField {...params} label="Parent Category" />
        )}
        isOptionEqualToValue={(option, value) =>
          option.category_id === value.category_id
        }
        renderOption={(props, option) => (
          <li {...props} key={option.category_id}>
            {option.category_name}
          </li>
        )}
      />
      <FormHelperText>
        If it should be a subcategory chose the parent one
      </FormHelperText>

      <FormControl sx={{ marginTop: "35px", minWidth: "200px" }}>
        <InputLabel>Show</InputLabel>
        <Select
          value={showType}
          label="Show"
          onChange={(e) => setShowType(e.target.value)}
        >
          <MenuItem value={0}>Products</MenuItem>
          <MenuItem value={1}>Sub Categories</MenuItem>
        </Select>
      </FormControl>

      {/* <ImageUpload onImageSelect={handleImageSelect} accept="image/*" /> */}

      <div>
        {!isUpdateCategory ? (
          <Button
            variant="contained"
            sx={{ marginTop: "35px" }}
            disabled={categoryName ? false : true}
            onClick={() =>
              handleSave?.(
                parentCategory,
                categoryName,
                categoryDescr,
                showType
              )
            }
          >
            Add new Category
          </Button>
        ) : (
          <Button
            variant="contained"
            sx={{ marginTop: "35px" }}
            disabled={categoryName ? false : true}
            onClick={() =>
              handleUpdate?.(
                parentCategory,
                categoryName,
                categoryDescr,
                categoryId!,
                showType
              )
            }
          >
            Update Category
          </Button>
        )}
      </div>
    </>
  );
}
