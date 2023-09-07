"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  TableRow,
  TableCell,
  Paper,
  Skeleton,
  Collapse,
  Box,
  IconButton,
  Divider,
} from "@mui/material";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import EditIcon from "@mui/icons-material/Edit";

import DataTable from "@/admin/components/table/table";
import PaginationBar from "@/admin/components/pagination/pagination";
import Search from "@/admin/components/search/search";
import ProductsVariations from "./product/components/productsExpandedArea/productsVariations";

import {
  getProducts,
  searchProducts,
  getProductsVariations,
} from "@/services/products";

import { IProduct, IProductVariations } from "@/types/productTypes";

const tableColumns = [
  // { label: "Image", align: "left" },
  { label: "Name", align: "left" },
  { label: "Sku", align: "left" },
  { label: "Price", align: "left" },
  { label: "Sale Price", align: "left" },
  { label: "Stock", align: "left" },
  { label: "Categories", align: "left" },
  { label: "Status", align: "left" },
  { label: "Actions", align: "right" },
];

export default function Products() {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const [pagination, setPagination] = useState({ page: 0, perPage: 50 });
  const [paginationTotalCount, setPaginationTotalCount] = useState(0);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [searchProduct, setSearchProduct] = useState<string>();

  const [expand, setExpand] = useState<{
    expanded: boolean;
    id: number | null | undefined;
  }>({ expanded: false, id: null });

  const fetchProducts = useCallback(() => {
    getProducts(pagination).then((response) => {
      setPaginationTotalCount(
        parseInt(response.products[0].totalProductsCount)
      );
      setProducts(response.products);
    });
  }, [pagination, searchProduct]);

  const handleSearch = useCallback((searchValue: string) => {
    setSearchProduct(searchValue);
    if (searchValue) {
      searchProducts(searchValue).then((response: IProduct[]) => {
        setProducts(response);
      });
    } else {
      setSearchProduct("");
      fetchProducts();
    }
  }, []);

  const handleEditProduct = (id: number | null) => {
    router.push("products/product?productId=" + id);
  };

  useEffect(() => {
    setIsClient(true);
    fetchProducts();
  }, [pagination]);

  return (
    <Paper sx={{ padding: "15px 0" }}>
      {isClient && products ? (
        <>
          {/* TODO ADD VIRTUOSO */}
          <Search handleSearch={handleSearch} />
          <Divider light sx={{ marginBottom: "10px" }} />
          <DataTable
            columns={tableColumns}
            stickyHeader={true}
            tableContainerMaxHeight={600}
          >
            {products.map((product: IProduct, index: number) => (
              <React.Fragment key={product.id}>
                <TableRow
                  hover
                  selected={product.id === expand.id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  {/* <TableCell>{product.image}</TableCell> */}
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.sku ? product.sku : "-"}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>
                    {product.sale_price ? product.sale_price : "-"}
                  </TableCell>

                  <TableCell>
                    {product.product_type === "simple" ? (
                      product.quantity && product.quantity > 0 ? (
                        `In stock (${product.quantity})`
                      ) : (
                        "Out of stock (0)"
                      )
                    ) : (
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          setExpand({
                            expanded: !expand.expanded,
                            id: product.id,
                          })
                        }
                      >
                        Expand to see more info
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    {product.category_names ? product.category_names : "-"}
                  </TableCell>
                  <TableCell>{product.status}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      aria-label="edit product"
                      size="small"
                      onClick={() =>
                        handleEditProduct(product.id ? product.id : null)
                      }
                    >
                      <EditIcon />
                    </IconButton>
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
                      {product.id === expand.id ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </IconButton>
                  </TableCell>
                </TableRow>

                <TableRow selected={product.id === expand.id}>
                  <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={12}
                  >
                    <Collapse
                      in={product.id === expand.id}
                      timeout="auto"
                      unmountOnExit
                    >
                      <Box>
                        <ProductsVariations
                          productId={product.id}
                          isExpanded={expand.expanded}
                        />
                      </Box>
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
