"use client";
import { useMemo } from "react";
import { IAttributesGrouped } from "@/types/attributesTypes";
import {
  Box,
  InputAdornment,
  TableCell,
  TableRow,
  TextField,
} from "@mui/material";

import DataTable from "@/admin/components/table/table";

const tableColumns = [
  { label: "Variation", align: "left" },
  { label: "Price", align: "left" },
  { label: "Sale Price", align: "left" },
  { label: "Sku", align: "left" },
  { label: "Stock", align: "left" },
];

// Function to generate combinations of selected attributes
const generateAttributeCombinations = (
  parsedAttributes: IAttributesGrouped[],
  checkedAttributes: number[],
  currentIndex: number,
  currentCombination: string[],
  combinations: string[][]
): void => {
  if (currentIndex === parsedAttributes.length) {
    // Reached the last attribute, add the current combination to the list
    combinations.push([...currentCombination]);
    return;
  }
  const attribute = parsedAttributes[currentIndex];
  const selectedValues = attribute.attribute_values.filter((value: any) =>
    checkedAttributes.includes(value.id)
  );

  for (const value of selectedValues) {
    currentCombination[currentIndex] = value.name;
    generateAttributeCombinations(
      parsedAttributes,
      checkedAttributes,
      currentIndex + 1,
      currentCombination,
      combinations
    );
  }
};

interface ProductVariationsMultipleProps {
  parsedAttributes: {
    attribute_values: any;
    attribute_id: number;
    attribute_name: string;
  }[];
  checkedAttributes: number[];
}

export default function ProductVariationsMultiple({
  parsedAttributes,
  checkedAttributes,
}: ProductVariationsMultipleProps) {
  const memoizedColumns = useMemo(() => tableColumns, []);

  const attributeCombinations = useMemo(() => {
    const combinations: string[][] = [];
    generateAttributeCombinations(
      parsedAttributes,
      checkedAttributes,
      0,
      Array(parsedAttributes.length).fill(""),
      combinations
    );
    return combinations;
  }, [parsedAttributes, checkedAttributes]);

  return (
    <Box>
      <DataTable columns={memoizedColumns}>
        {attributeCombinations.map((combination, index) => (
          <TableRow
            key={index}
            sx={{
              "&:last-child td, &:last-child th": { border: 0 },
            }}
          >
            <TableCell>{combination.join(" ")}</TableCell>
            <TableCell>
              <TextField
                label=""
                required
                size="small"
                variant="outlined"
                // value={productModel.price ? productModel.price : ""}
                InputProps={{
                  inputProps: {
                    min: 0,
                  },
                  endAdornment: (
                    <InputAdornment position="end">€</InputAdornment>
                  ),
                }}
                type="number"
                // onChange={(e) => {
                //   setProductModel({
                //     ...productModel,
                //     price: parseFloat(e.target.value),
                //   });
                // }}
              />
            </TableCell>
            <TableCell>
              <TextField
                label=""
                required
                size="small"
                variant="outlined"
                // value={productModel.price ? productModel.price : ""}
                InputProps={{
                  inputProps: {
                    min: 0,
                  },
                  endAdornment: (
                    <InputAdornment position="end">€</InputAdornment>
                  ),
                }}
                type="number"
                // onChange={(e) => {
                //   setProductModel({
                //     ...productModel,
                //     price: parseFloat(e.target.value),
                //   });
                // }}
              />
            </TableCell>
            <TableCell>
              <TextField
                label=""
                required
                size="small"
                variant="outlined"
                // value={productModel.price ? productModel.price : ""}

                // onChange={(e) => {
                //   setProductModel({
                //     ...productModel,
                //     price: parseFloat(e.target.value),
                //   });
                // }}
              />
            </TableCell>
            <TableCell>
              <TextField
                label=""
                required
                size="small"
                variant="outlined"
                // value={productModel.price ? productModel.price : ""}

                // onChange={(e) => {
                //   setProductModel({
                //     ...productModel,
                //     price: parseFloat(e.target.value),
                //   });
                // }}
              />
            </TableCell>
          </TableRow>
        ))}
      </DataTable>
    </Box>
  );
}
