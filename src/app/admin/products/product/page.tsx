"use client";
import { useState, useEffect } from "react";
import { Grid, Paper, Typography } from "@mui/material";

import ProductBasicFields from "./components/basicFields";

import { ProductModel } from "@/admin/products/product/model";

import { IProduct } from "@/types/productTypes";

export default function Product() {
  const save = () => {
    console.log(ProductModel);
  };

  return (
    <>
      <Paper elevation={3} sx={{ padding: "15px 25px", margin: "0 0 25px 0" }}>
        <Typography variant="h5">Add new Product</Typography>
      </Paper>

      <Grid container spacing={4}>
        <Grid item xs={12} md={7} lg={8}>
          <Paper elevation={3} sx={{ padding: "15px 25px" }}>
            <ProductBasicFields />
            <button onClick={save}>SAVE</button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={5} lg={4}>
          <Paper elevation={3} sx={{ padding: "15px 25px" }}>
            fafa
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
