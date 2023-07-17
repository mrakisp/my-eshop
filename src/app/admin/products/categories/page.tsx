"use client";
import { useState } from "react";
import AddCategory from "./components/addCategory";
import CategoriesList from "./components/categoriesList";
import {
  Grid,
  Button,
  Skeleton,
  SelectChangeEvent,
  Paper,
  Typography,
} from "@mui/material";

export default function Categories() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSaveNewCategory = (
    parentCategory: string,
    categoryName: string,
    categoryDescr: string
  ) => {};

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
            <CategoriesList />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
