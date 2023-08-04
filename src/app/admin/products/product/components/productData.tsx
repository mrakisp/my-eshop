"use client";
import {
  useState,
  useCallback,
  useEffect,
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useMemo,
} from "react";
import {
  TextField,
  Box,
  Stack,
  FormGroup,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Skeleton,
  InputAdornment,
  Divider,
  Alert,
  Tooltip,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import SectionTitle from "@/admin/components/sectionTitle/sectionTitle";
import Search from "@/admin/components/search/search";
// import ProductVariationsMultiple from "./productVariationsMultiple";
import ProductVariations from "./productVariations";

import { IProduct, IProductVariations } from "@/types/productTypes";
import { IAttributesGrouped } from "@/types/attributesTypes";
import { getAttributeValuesGrouped } from "@/services/attributes";

import { removeAccents } from "@/utils/utils";

import styles from "./productData.module.scss";

interface ProductDataProps {
  isSimpleProduct: boolean;
  productModel: IProduct;
  setProductModel: Dispatch<SetStateAction<IProduct>>;
  variationsModel: IProductVariations[];
  setVariationsModel: Dispatch<SetStateAction<IProductVariations[]>>;
}

export default function ProductData({
  isSimpleProduct,
  productModel,
  setProductModel,
  variationsModel,
  setVariationsModel,
}: ProductDataProps) {
  const [attributeForVariation, setAttributeForVariation] = useState<
    number | null
  >();
  const [checkedAttributes, setCheckedAttributes] = useState<number[]>([]);
  const [attributes, setAttributes] = useState<IAttributesGrouped[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const fetchAttributes = useCallback(() => {
    setIsLoading(true);
    getAttributeValuesGrouped().then((response: IAttributesGrouped[]) => {
      setAttributes(response);
      setIsLoading(false);
    });
  }, []);

  const handleAttributeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const attributesValues = parseInt(event.target.value);
    if (event.target.checked) {
      setCheckedAttributes((prev) => [...prev, attributesValues]);
      setProductModel((prevProductModel) => ({
        ...prevProductModel,
        attributes_ids: [
          ...(prevProductModel.attributes_ids
            ? prevProductModel.attributes_ids.split(",").map(Number)
            : []),
          attributesValues,
        ].toString(),
      }));
    } else {
      setCheckedAttributes((prev) =>
        prev.filter((item) => item !== attributesValues)
      );
      setProductModel((prevProductModel) => ({
        ...prevProductModel,
        attributes_ids: prevProductModel.attributes_ids
          ? prevProductModel.attributes_ids
              .split(",")
              .map(Number)
              .filter((item) => item !== attributesValues)
              .toString()
          : "",
      }));
    }
  };

  const handleUsedForVariation = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setAttributeForVariation(parseInt(event.target.value));
    } else {
      setAttributeForVariation(null);
    }
  };

  // Parse attributeValuesArray once when attributes are fetched
  const parsedAttributes = useMemo(() => {
    return attributes.map((attr: IAttributesGrouped) => ({
      ...attr,
      attribute_values: JSON.parse(attr.attribute_values),
    }));
  }, [attributes]);

  const variations = useMemo(() => {
    return parsedAttributes.filter(
      (value: IAttributesGrouped) =>
        value.attribute_id === attributeForVariation
    );
  }, [attributeForVariation, checkedAttributes, parsedAttributes]);

  const handleSearch = useCallback((searchValue: string) => {
    setSearchValue(searchValue);
  }, []);

  useEffect(() => {
    fetchAttributes();
  }, []);

  useEffect(() => {
    if (!productModel.attributes_ids) {
      setCheckedAttributes([]);
    } else {
      setCheckedAttributes(productModel.attributes_ids.split(",").map(Number));
    }
  }, [productModel.attributes_ids]);

  useEffect(() => {
    if (!variationsModel[0]?.atr_id) {
      setAttributeForVariation(null);
    } else {
      setAttributeForVariation(variationsModel[0]?.atr_id);
    }
  }, [variationsModel[0]?.atr_id]);

  // Memoize the JSX elements that depend on productModel or its properties
  const attributesJSX = useMemo(() => {
    return isLoading ? (
      <Skeleton height={300} />
    ) : (
      <Stack spacing={2}>
        {parsedAttributes.map((attr: IAttributesGrouped) => (
          <FormControl key={attr.attribute_id}>
            <FormLabel className={styles.attributesLabel}>
              {attr.attribute_name}
              {!isSimpleProduct && (
                <FormControlLabel
                  sx={{ marginLeft: "auto" }}
                  control={
                    <Checkbox
                      checked={
                        attributeForVariation &&
                        attributeForVariation === attr.attribute_id
                          ? true
                          : false
                      }
                      onChange={handleUsedForVariation}
                      value={attr.attribute_id}
                    />
                  }
                  label="Used for Variations"
                />
              )}
            </FormLabel>
            <Divider />
            <FormGroup row>
              {attr.attribute_values.map(
                (value: { id: number; name: string }) => (
                  <FormControlLabel
                    className={
                      searchValue &&
                      !removeAccents(value.name.toLowerCase()).includes(
                        removeAccents(searchValue.toLowerCase())
                      )
                        ? styles.hidden
                        : ""
                    }
                    key={value.id}
                    control={
                      <Checkbox
                        checked={checkedAttributes.includes(value.id)}
                        onChange={handleAttributeChange}
                        value={value.id}
                      />
                    }
                    label={value.name}
                  />
                )
              )}
            </FormGroup>
          </FormControl>
        ))}
      </Stack>
    );
  }, [
    parsedAttributes,
    checkedAttributes,
    isLoading,
    attributeForVariation,
    isSimpleProduct,
    searchValue,
  ]);

  return (
    <Box>
      <Stack direction="row" spacing={2}>
        {isSimpleProduct && (
          <>
            <TextField
              label="Price"
              required
              variant="outlined"
              value={productModel.price ? productModel.price : ""}
              InputProps={{
                inputProps: {
                  min: 0,
                },
                endAdornment: <InputAdornment position="end">€</InputAdornment>,
              }}
              type="number"
              onChange={(e) => {
                setProductModel({
                  ...productModel,
                  price: parseFloat(e.target.value),
                });
              }}
            />
            <TextField
              label="Sale Price"
              variant="outlined"
              disabled={!productModel.price}
              value={productModel.sale_price ? productModel.sale_price : ""}
              InputProps={{
                inputProps: {
                  min: 0,
                },
                endAdornment: <InputAdornment position="end">€</InputAdornment>,
              }}
              type="number"
              onChange={(e) => {
                if (
                  productModel.price &&
                  (parseFloat(e.target.value) < productModel.price ||
                    !e.target.value)
                )
                  setProductModel({
                    ...productModel,
                    sale_price: parseFloat(e.target.value),
                  });
              }}
            />
          </>
        )}
        <TextField
          label={isSimpleProduct ? "Sku" : "Sku*"}
          variant="outlined"
          value={productModel.sku ? productModel.sku : ""}
          onChange={(e) =>
            setProductModel({ ...productModel, sku: e.target.value })
          }
        />
        {isSimpleProduct && (
          <TextField
            label="Stock"
            variant="outlined"
            value={productModel.quantity ? productModel.quantity : ""}
            onChange={(e) =>
              setProductModel({
                ...productModel,
                quantity: parseInt(e.target.value),
              })
            }
          />
        )}
        <TextField
          sx={{ maxWidth: "250px" }}
          label="Grouped Product Id"
          variant="outlined"
          value={productModel.grouped_id ? productModel.grouped_id : ""}
          onChange={(e) =>
            setProductModel({
              ...productModel,
              grouped_id: e.target.value,
            })
          }
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Tooltip
                  sx={{ cursor: "pointer" }}
                  arrow
                  placement="top"
                  title="If we have same products but they have different attributes we need to link them in order to matched in the shop Front. 
                  For example we have 1 shoe in blue color with size xl,xxl and we have another same shoe with color red and size xl,xxl. Add the same Grouped Product ID like 'sku1' to both shoes and they will linked. 
                  As a result a mini image of every grouped product will be visible in each product page and user will be able to see all the colors & select the desired one."
                >
                  <InfoIcon />
                </Tooltip>
              </InputAdornment>
            ),
          }}
          helperText="Set a unique ID for related products to group them."
        />
      </Stack>
      <SectionTitle
        title="Attributes"
        rightArea={<Search handleSearch={handleSearch} isStandAlone={false} />}
      />
      {(!isSimpleProduct && productModel.sku) || isSimpleProduct ? (
        <div className={styles.attributesContainer}>{attributesJSX}</div>
      ) : (
        <Alert severity="warning">
          Fill Sku first to set attributes & variations
        </Alert>
      )}

      {!isSimpleProduct &&
        attributeForVariation &&
        variations?.length > 0 &&
        productModel.sku && (
          <>
            <SectionTitle title="Attribute Variations" />
            <ProductVariations
              parsedAttributes={variations}
              checkedAttributes={checkedAttributes}
              variationsModel={variationsModel}
              setVariationsModel={setVariationsModel}
              sku={productModel.sku}
            />
            {/* <ProductVariationsMultiple
            parsedAttributes={parsedAttributes}
            checkedAttributes={checkedAttributes}
          /> */}
          </>
        )}
    </Box>
  );
}

// ta attributes rows prepei na exoun ena checkbox gia used sta variations. Mono ena attribute row mporei na einai selected gia variations kai tote gia kathe checked value tha prepei na dimiourgei ena row
// otan epilexthei auto to checkbox mazi me ta values tou prepei na pernaei sto product_variations ws eggrafh
// ta proioda me idio top sku tha ginode match gia ta xrwmata
