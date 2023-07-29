"use client";
import { useState, useEffect } from "react";
import { Grid, Paper, TextField, Typography, Button } from "@mui/material";
import WysiwygEditor from "@/admin/components/wysiwgEditor/wysiwgEditor";

import { ProductModel } from "@/admin/products/product/model";
export default function ProductBasicFields() {
  const handleDescriptionChange = (newContent: string) => {
    ProductModel.description = newContent;
  };

  const handleShortDescriptionChange = (newContent: string) => {
    ProductModel.shortDescr = newContent;
  };

  const handleProductName = (name: string) => {
    ProductModel.name = name;
  };

  return (
    <>
      <TextField
        sx={{ margin: "10px 0" }}
        fullWidth
        label="Name"
        multiline
        defaultValue={ProductModel.name}
        onChange={(e) => handleProductName(e.target.value)}
      />
      <WysiwygEditor
        label="Description"
        value={ProductModel.description}
        onChange={handleDescriptionChange}
        error={false}
      />
      <WysiwygEditor
        label="Short Description"
        value={ProductModel.shortDescr}
        onChange={handleShortDescriptionChange}
        error={false}
      />

      {/* <WysiwygEditor
        label="Description"
        value={richContentDescription}
        onChange={setRichContentDescription}
        error={false} // Set to true to show an error message
      />

      <WysiwygEditor
        label="Short Description"
        value={richContentShortDescription}
        onChange={setRichContentShortDescription}
        error={false} // Set to true to show an error message
      /> */}
    </>
  );
}
