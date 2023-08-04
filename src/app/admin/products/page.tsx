"use client";
import React, { useState, useEffect, useCallback } from "react";

import {
  TableRow,
  TableCell,
  Paper,
  Skeleton,
  Collapse,
  Box,
  IconButton,
} from "@mui/material";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import DataTable from "@/admin/components/table/table";
import PaginationBar from "@/admin/components/pagination/pagination";
import Search from "@/admin/components/search/search";

import { getProducts } from "@/services/products";

import { IProduct, IProductVariations } from "@/types/productTypes";

const tableColumns = [
  // { label: "Image", align: "left" },
  { label: "Name", align: "left" },
  { label: "Sku", align: "left" },
  { label: "Sale Price", align: "left" },
  { label: "Unique Sku (*)", align: "left" },
  { label: "Stock (*)", align: "left" },
  { label: "Actions", align: "right" },
];

export default function Products() {
  const [isClient, setIsClient] = useState(false);
  const [pagination, setPagination] = useState({ page: 0, perPage: 50 });
  const [paginationTotalCount, setPaginationTotalCount] = useState(0);
  const [products, setProducts] = useState<IProduct[]>([]);

  const [expand, setExpand] = useState<{
    expanded: boolean;
    id: number | null | undefined;
  }>({ expanded: false, id: null });

  useEffect(() => {
    setIsClient(true);
    getProducts(pagination).then((response) => {
      setPaginationTotalCount(
        parseInt(response.products[0].totalProductsCount)
      );
      setProducts(response.products);
    });
  }, []);

  const handleSearch = useCallback((searchValue: string) => {
    // setSearchCategory(searchValue);
    // if (searchValue) {
    //   setIsLoading(true);
    //   searchCategories(searchValue).then((response: ICategories[]) => {
    //     setCategories(response);
    //     setIsLoading(false);
    //   });
    // } else {
    //   fetchCategories();
    // }
  }, []);

  return (
    <Paper sx={{ padding: "15px 0" }}>
      {isClient && products ? (
        <>
          {/* TODO ADD VIRTUOSO */}
          <Search handleSearch={handleSearch} />
          <DataTable columns={tableColumns} stickyHeader={true}>
            {products.map((product: IProduct, index: number) => (
              <React.Fragment key={product.id}>
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  {/* <TableCell>{product.image}</TableCell> */}
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.sku}</TableCell>
                  <TableCell>test</TableCell>
                  <TableCell>test</TableCell>
                  <TableCell>
                    {product.product_type === "simple"
                      ? product.quantity && product.quantity > 0
                        ? `In stock (${product.quantity})`
                        : "Out of stock (0)"
                      : "expand"}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      aria-label="expand row"
                      size="small"
                      onClick={() =>
                        setExpand({
                          expanded: !expand.expanded,
                          id: product.id,
                        })
                      }
                    >
                      {expand.expanded && product.id === expand.id ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </IconButton>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={6}
                  >
                    <Collapse
                      in={expand.expanded && product.id === expand.id}
                      timeout="auto"
                      unmountOnExit
                    >
                      <Box>fafa</Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </DataTable>
          <PaginationBar
            pagination={pagination}
            setPagination={setPagination}
            paginationTotalCount={paginationTotalCount}
            perPageOptions={[50, 80, 100]}
          />
        </>
      ) : (
        <Skeleton height={700} />
      )}
    </Paper>
  );
}
