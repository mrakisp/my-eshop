"use client";
import { useState, useEffect } from "react";
import { Grid, Paper, Typography } from "@mui/material";

export default function Product() {
  return (
    <>
      <Paper elevation={3} sx={{ padding: "15px 25px", margin: "0 0 25px 0" }}>
        <Typography variant="h5">Add new Product</Typography>
      </Paper>

      <Grid container spacing={4}>
        <Grid item xs={12} md={12} lg={5}>
          <Paper elevation={3} sx={{ padding: "15px 25px" }}>
            ad
          </Paper>
        </Grid>
        <Grid item xs={12} md={12} lg={7}>
          <Paper elevation={3} sx={{ padding: "15px 25px" }}>
            fafa
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
