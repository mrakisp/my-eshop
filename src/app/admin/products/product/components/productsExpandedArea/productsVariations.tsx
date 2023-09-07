"use client";
import React, { useState, useEffect } from "react";

import { TableRow, TableCell, Skeleton } from "@mui/material";
import DataTable from "@/admin/components/table/table";

import { IProductVariations } from "@/types/productTypes";

import { getProductsVariations } from "@/services/products";

const tableColumns = [
  { label: "Attribute", align: "left" },
  { label: "Sku", align: "left" },
  { label: "Price", align: "left" },
  { label: "Sale Price", align: "left" },
  { label: "Stock", align: "left" },
  // { label: "Actions", align: "left" },
];

interface ProductsVariationsProps {
  productId: number | null | undefined;
  isExpanded: boolean;
}

function ProductsVariations({
  productId,
  isExpanded,
}: ProductsVariationsProps) {
  const [variations, setVariations] = useState<IProductVariations[]>([]);

  const fetchProductVariations = (id: number) => {
    getProductsVariations(id).then((response) => {
      setVariations(response);
    });
  };

  useEffect(() => {
    if (isExpanded && productId) fetchProductVariations(productId);
  }, [isExpanded]);

  return (
    <DataTable columns={tableColumns}>
      {variations.map((variation: IProductVariations, index: number) => (
        <React.Fragment key={variation.id}>
          <TableRow>
            <TableCell width="100px">{variation.attribute_name}</TableCell>
            <TableCell width="150px">
              {variation.sku ? variation.sku : "-"}
            </TableCell>
            <TableCell width="100px">{variation.price}</TableCell>
            <TableCell width="150px">
              {variation.sale_price ? variation.sale_price : "-"}
            </TableCell>
            <TableCell>{variation.stock ? variation.stock : 0}</TableCell>
            {/* <TableCell>a</TableCell> */}
          </TableRow>
        </React.Fragment>
      ))}
    </DataTable>
  );
}

export default ProductsVariations;
