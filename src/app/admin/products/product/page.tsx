"use client";
import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import {
  Button,
  Grid,
  Paper,
  Typography,
  CircularProgress,
} from "@mui/material";

import BottomNav from "@/admin/components/bottomNav/bottomNav";
import { ProductModel } from "@/admin/products/product/model";
import ProductBasicFields from "./components/basicFields";
import ProductType from "./components/productType";
import ProductData from "./components/productData";
import SideBar from "./components/sideBar";

import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import { IProduct } from "@/types/productTypes";

import { addProduct, getProduct } from "@/services/product";

import styles from "./page.module.scss";

export default function Product() {
  const productIdParams = useSearchParams();
  const productId = productIdParams.get("productId");
  const [isClient, setIsClient] = useState(false);
  const [productModel, setProductModel] = useState<IProduct>(ProductModel);

  const [isSimpleProduct, setIsSimpleProduct] = useState(
    ProductModel.product_type === "simple"
  );

  // const createProduct = () => {
  //   // console.log(productModel);
  //   // setProductModel(ProductModel);
  //   // setProductModel({ ...productModel, category_ids: "101,1", name: "akis" });
  //   addProduct(productModel).then((response: IProduct) => {
  //     setProductModel(ProductModel);
  //   });
  // };

  const createProduct = useCallback(() => {
    addProduct(productModel).then((response: IProduct) => {
      setProductModel(ProductModel);
    });
  }, []);

  const createDuplicateProduct = () => {
    addProduct(productModel).then((response: IProduct) => {
      // setProductModel(ProductModel);
    });
  };

  const deleteProduct = () => {
    // addProduct(productModel).then((response: IProduct) => {
    //   setProductModel(ProductModel);
    // });
  };

  const updateProduct = () => {
    // addProduct(productModel).then((response: IProduct) => {
    //   setProductModel(ProductModel);
    // });
  };

  const validateReqFields = () => {
    const { name, price, status, product_type } = productModel;

    if (name && price && status && product_type) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (productId)
      getProduct(productId).then((response: IProduct[]) => {
        setProductModel(response[0]);
      });
  }, [productId]);

  // const memoizedProductModel = useMemo(
  //   () => productModel,
  //   [productModel.name, productModel.description, productModel.shortDescr]
  // );

  return (
    <>
      <Paper elevation={3} sx={{ padding: "15px 25px", margin: "0 0 25px 0" }}>
        <Typography variant="h5">Add new Product</Typography>
      </Paper>

      {isClient && (
        <>
          <Grid container spacing={4} sx={{ paddingBottom: "100px" }}>
            <Grid item xs={12} md={12} lg={8}>
              <Paper elevation={3} sx={{ padding: "15px 25px" }}>
                <ProductBasicFields
                  productModel={productModel}
                  setProductModel={setProductModel}
                />
                <ProductType
                  setIsSimpleProduct={setIsSimpleProduct}
                  productModel={productModel}
                  setProductModel={setProductModel}
                />
                <ProductData
                  isSimpleProduct={isSimpleProduct}
                  productModel={productModel}
                  setProductModel={setProductModel}
                />
              </Paper>
            </Grid>
            <Grid item xs={12} md={12} lg={4}>
              <Paper elevation={3} sx={{ padding: "15px 25px" }}>
                <SideBar
                  productModel={productModel}
                  setProductModel={setProductModel}
                />
              </Paper>
            </Grid>
          </Grid>
          <BottomNav>
            <div className={styles.actionsContainer}>
              <div className={styles.actionsLeft}>
                <Button
                  variant="contained"
                  startIcon={<AddCircleOutlineIcon />}
                  aria-label="Create Product"
                  disabled={!productModel.name || !productModel.price}
                  onClick={createProduct}
                >
                  {/* <CircularProgress color="secondary" size={20} /> */}
                  Create Product
                </Button>
                <Button
                  variant="contained"
                  startIcon={<ContentCopyIcon />}
                  aria-label="Create Product & Duplicate"
                  disabled={!productModel.name || !productModel.price}
                  onClick={createDuplicateProduct}
                  sx={{ marginLeft: "20px" }}
                >
                  Create & Duplicate
                </Button>
              </div>

              <div className={styles.actionsRight}>
                {productModel.id && (
                  <Button
                    variant="contained"
                    startIcon={<DeleteIcon />}
                    aria-label="Delete Product"
                    color="error"
                    onClick={deleteProduct}
                  >
                    Delete Product
                  </Button>
                )}
              </div>
            </div>
          </BottomNav>
        </>
      )}
    </>
  );
}
