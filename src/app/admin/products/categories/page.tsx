"use client";
import { useState, useEffect } from "react";

import {
  Grid,
  Button,
  Skeleton,
  SelectChangeEvent,
  Paper,
  Typography,
} from "@mui/material";

import AddCategory from "./components/addCategory";
import CategoriesTable from "./components/categoriesTable";
import Search from "@/admin/components/search/search";
import { ICategories } from "@/types/categoriesTypes";
import { getCategories } from "@/services/categories";

export default function Categories() {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<ICategories[]>([]);

  useEffect(() => {
    setIsLoading(true);
    getCategories().then((response: ICategories[]) => {
      setCategories(response);
      setIsLoading(false);
    });
  }, []);

  const handleSaveNewCategory = (
    parentCategory: string,
    categoryName: string,
    categoryDescr: string
  ) => {};

  const handleSearch = (searchValue: string) => {
    console.log(searchValue);
  };

  return (
    <>
      <Paper elevation={3} sx={{ padding: "15px 25px", margin: "0 0 25px 0" }}>
        <Typography variant="h5">Product Categories</Typography>
      </Paper>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6} lg={5}>
          <Paper elevation={3} sx={{ padding: "15px 25px" }}>
            <AddCategory handleSave={handleSaveNewCategory} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={7}>
          <Paper elevation={3} sx={{ padding: "15px 25px" }}>
            <Search handleSearch={handleSearch} />
            <CategoriesTable data={categories} isLoading={isLoading} />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
