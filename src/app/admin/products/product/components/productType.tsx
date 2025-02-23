import { Dispatch, SetStateAction, useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import { IProduct } from "@/types/productTypes";

interface ProductTypeProps {
  setIsSimpleProduct: Dispatch<SetStateAction<boolean>>;
  productModel: IProduct;
  setProductModel: Dispatch<SetStateAction<IProduct>>;
  isSimpleProduct: boolean;
}
export default function ProductType({
  setIsSimpleProduct,
  productModel,
  setProductModel,
  isSimpleProduct,
}: ProductTypeProps) {
  const handleChange = (event: any) => {
    setProductModel({
      ...productModel,
      product_type: event.target.value,
    });
    setIsSimpleProduct(event.target.value === "simple" ? true : false);
  };

  return (
    <FormControl sx={{ margin: "20px 0" }}>
      <FormLabel>Type</FormLabel>
      <RadioGroup
        value={isSimpleProduct ? "simple" : "variable"}
        onChange={handleChange}
        row
      >
        <FormControlLabel value="simple" control={<Radio />} label="Simple" />
        <FormControlLabel
          value="variable"
          control={<Radio />}
          label="Variable"
        />
      </RadioGroup>
    </FormControl>
  );
}
