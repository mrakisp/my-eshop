"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
// import { useRouter } from "next/router";
import {
  Button,
  Grid,
  Paper,
  Typography,
  // CircularProgress,
} from "@mui/material";

import BottomNav from "@/admin/components/bottomNav/bottomNav";
import LoadingFullScreenProps from "@/admin/components/loadingFullScreen/loadingFullScreen";
import {
  ProductModel,
  // ProductVariationsModel,
} from "@/admin/products/product/model";
import ProductBasicFields from "./components/basicFields";
import ProductType from "./components/productType";
import ProductData from "./components/productData";
import SideBar from "./components/sideBar";

import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import SaveIcon from "@mui/icons-material/Save";

import { IProduct, IProductVariations } from "@/types/productTypes";

import { addProduct, getProduct, deleteProduct } from "@/services/product";

import { addVariations, getVariations } from "@/services/variations";

import styles from "./page.module.scss";

export default function Product() {
  const productIdParams = useSearchParams();
  const router = useRouter();
  const productId = productIdParams.get("productId");
  const isDuplicate = productIdParams.get("duplicate");
  const [isClient, setIsClient] = useState(false);
  const [isLoadingFullScreen, setIsLoadingFullScreen] = useState(false);

  const [hasValidFields, setHasValidFields] = useState(false);
  const [productModel, setProductModel] = useState<IProduct>(ProductModel);
  const [variationsModel, setVariationsModel] = useState<IProductVariations[]>(
    []
  );

  const [isSimpleProduct, setIsSimpleProduct] = useState(
    ProductModel.product_type === "simple"
  );

  const createProduct = useCallback(() => {
    console.log(productModel);
    console.log(variationsModel);

    if (!hasValidFields) return;
    setIsLoadingFullScreen(true);
    addProduct(productModel).then((response: IProduct) => {
      if (!isSimpleProduct && variationsModel?.length > 0) {
        addVariations(response.id, variationsModel).then(
          (response: IProduct) => {
            setProductModel(ProductModel);
            setVariationsModel([]);
            setIsSimpleProduct(true);
            setIsLoadingFullScreen(false);
          }
        );
      } else {
        setProductModel(ProductModel);
        setIsSimpleProduct(true);
        setIsLoadingFullScreen(false);
      }
    });
  }, [productModel, variationsModel]);

  const createDuplicateProduct = useCallback(() => {
    if (!hasValidFields) return;
    setIsLoadingFullScreen(true);
    addProduct(productModel).then((response: IProduct) => {
      if (!isSimpleProduct && variationsModel?.length > 0) {
        addVariations(response.id, variationsModel).then(
          (response: IProduct) => {
            setIsLoadingFullScreen(false);
          }
        );
      } else {
        setIsLoadingFullScreen(false);
      }
    });
  }, [productModel, variationsModel]);

  const handleDeleteProduct = useCallback(() => {
    if (!productModel.id || !productId) {
      return;
    }
    setIsLoadingFullScreen(true);
    deleteProduct(productModel.id).then((response: IProduct) => {
      setProductModel(ProductModel);
      setVariationsModel([]);
      setIsSimpleProduct(true);
      setIsLoadingFullScreen(false);
      router.push("product");
    });
  }, [productId, productModel.id]);

  const updateProduct = useCallback(() => {
    if (!productModel.id || !productId) {
      return;
    }
    if (!hasValidFields) return;
    setIsLoadingFullScreen(true);
    // addProduct(productModel).then((response: IProduct) => {
    //   setProductModel(ProductModel);
    // });
  }, [productId, productModel.id]);

  const duplicateProduct = useCallback(() => {
    // setProductModel({
    //   ...productModel,
    //   id: null,
    // });
    router.push("product?duplicate=true");
  }, []);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (productId)
      getProduct(productId).then((response: IProduct[]) => {
        setProductModel(response[0]);
        getVariations(productId).then((response: IProductVariations[]) => {
          setVariationsModel(response);
        });

        if (response[0].product_type === "simple") {
          setIsSimpleProduct(true);
        } else {
          setIsSimpleProduct(false);
        }
      });
  }, [productId]);

  useEffect(() => {
    if (isDuplicate) {
      setProductModel({
        ...productModel,
        id: null,
        sku: "",
      });
      // setVariationsModel([]);
    }
  }, [isDuplicate]);

  useEffect(() => {
    const { name, price, status, product_type, sku } = productModel;
    if (isSimpleProduct) {
      if (name && price && status && product_type === "simple") {
        setHasValidFields(true);
      } else {
        setHasValidFields(false);
      }
    } else {
      const isVariationsValid = variationsModel.every((item: any) => {
        return Object.keys(item).every(
          (key) =>
            key === "sale_price" || (item[key] !== null && item[key] !== "")
        );
      });

      const skuSet = new Set();
      const isSkuUnique = !variationsModel.some((variation) => {
        if (skuSet.has(variation.sku)) {
          return true;
        }
        skuSet.add(variation.sku);
        return false;
      });

      setHasValidFields(
        isVariationsValid &&
          !isSimpleProduct &&
          variationsModel.length > 0 &&
          isSkuUnique &&
          name !== "" &&
          product_type === "variable" &&
          sku !== ""
      );
    }
  }, [productModel, variationsModel]);

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
                  isSimpleProduct={isSimpleProduct}
                />
                <ProductData
                  isSimpleProduct={isSimpleProduct}
                  productModel={productModel}
                  setProductModel={setProductModel}
                  variationsModel={variationsModel}
                  setVariationsModel={setVariationsModel}
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
                {!productId ? (
                  <>
                    <Button
                      variant="contained"
                      startIcon={<AddCircleOutlineIcon />}
                      aria-label="Create Product"
                      disabled={!hasValidFields}
                      onClick={createProduct}
                    >
                      Create Product
                    </Button>
                    <Button
                      variant="contained"
                      startIcon={<ContentCopyIcon />}
                      aria-label="Create Product & Duplicate"
                      disabled={!hasValidFields}
                      onClick={createDuplicateProduct}
                      sx={{ marginLeft: "20px" }}
                    >
                      Create & Duplicate
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="contained"
                      startIcon={<SaveIcon />}
                      aria-label="Create Product"
                      disabled={!hasValidFields}
                      onClick={updateProduct}
                    >
                      Update Product
                    </Button>
                    <Button
                      variant="contained"
                      startIcon={<ContentCopyIcon />}
                      aria-label="Create Product & Duplicate"
                      disabled={!hasValidFields}
                      onClick={duplicateProduct}
                      sx={{ marginLeft: "20px" }}
                    >
                      Duplicate
                    </Button>
                  </>
                )}
              </div>

              <div className={styles.actionsRight}>
                {productModel.id && (
                  <Button
                    variant="contained"
                    startIcon={<DeleteIcon />}
                    aria-label="Delete Product"
                    color="error"
                    onClick={handleDeleteProduct}
                  >
                    Delete Product
                  </Button>
                )}
              </div>
            </div>
          </BottomNav>
          <LoadingFullScreenProps open={isLoadingFullScreen} />
        </>
      )}
    </>
  );
}
