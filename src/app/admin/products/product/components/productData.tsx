import {
  useState,
  useCallback,
  useEffect,
  ChangeEvent,
  Dispatch,
  SetStateAction,
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
} from "@mui/material";

import SectionTitle from "@/admin/components/sectionTitle/sectionTitle";
import ProductVariations from "@/admin/products/product/components/productVariations";

import { IProduct } from "@/types/productTypes";
import { IAttributesGrouped } from "@/types/attributesTypes";

import { getAttributeValuesGrouped } from "@/services/attributes";

interface ProductDataProps {
  isSimpleProduct: boolean;
  productModel: IProduct;
  setProductModel: Dispatch<SetStateAction<IProduct>>;
}

export default function ProductData({
  isSimpleProduct,
  productModel,
  setProductModel,
}: ProductDataProps) {
  const [checkedSizes, setCheckedSizes] = useState<string[]>([]);
  // const [checkedColors, setCheckedColors] = useState<string[]>([]);
  const [attributes, setAttributes] = useState<IAttributesGrouped[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAttributes = useCallback(() => {
    setIsLoading(true);
    getAttributeValuesGrouped().then((response: IAttributesGrouped[]) => {
      setAttributes(response);
      setIsLoading(false);
    });
  }, []);

  const handleAttributeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const size = event.target.value;
    if (event.target.checked) {
      setCheckedSizes((prev) => [...prev, size]);
    } else {
      setCheckedSizes((prev) => prev.filter((item) => item !== size));
    }
  };

  // const handleColorChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   const color = event.target.value;
  //   if (event.target.checked) {
  //     setCheckedColors((prev) => [...prev, color]);
  //   } else {
  //     setCheckedColors((prev) => prev.filter((item) => item !== color));
  //   }
  // };

  useEffect(() => {
    fetchAttributes();
  }, []);

  return (
    <Box>
      <Stack direction="row" spacing={2}>
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
        <TextField
          label="Sku"
          variant="outlined"
          value={productModel.sku ? productModel.sku : ""}
          onChange={(e) =>
            setProductModel({ ...productModel, sku: e.target.value })
          }
        />
        <TextField
          label="Stock"
          variant="outlined"
          value={productModel.quantity ? productModel.quantity : ""}
          onChange={(e) =>
            setProductModel({
              ...productModel,
              quantity: parseFloat(e.target.value),
            })
          }
        />
      </Stack>
      <SectionTitle title="Attributes" />

      {isLoading ? (
        <Skeleton height={300} />
      ) : (
        <Stack spacing={2}>
          {attributes &&
            attributes.map((attr: IAttributesGrouped) => {
              const attributeValuesArray = JSON.parse(attr.attribute_values);

              return (
                <FormControl key={attr.attribute_id}>
                  <FormLabel>{attr.attribute_name}</FormLabel>

                  <FormGroup row>
                    {attributeValuesArray.map(
                      (value: { id: number; name: string }) => (
                        <FormControlLabel
                          key={value.id}
                          control={
                            <Checkbox
                              checked={checkedSizes.includes(value.name)}
                              onChange={handleAttributeChange}
                              value={value.name}
                            />
                          }
                          label={value.name}
                        />
                      )
                    )}
                  </FormGroup>
                </FormControl>
              );
            })}
        </Stack>
      )}
      {/* {!isSimpleProduct && (
        <ProductVariations sizes={checkedSizes} colors={checkedColors} />
      )} */}
    </Box>
  );
}

// import { useState, useEffect, ChangeEvent } from "react";
// import {
//   TextField,
//   Box,
//   Typography,
//   Stack,
//   Paper,
//   FormGroup,
//   Checkbox,
//   FormControl,
//   FormControlLabel,
//   FormLabel,
//   RadioGroup,
//   Radio,
// } from "@mui/material";

// import { ProductModel } from "@/admin/products/product/model";
// import SectionTitle from "@/admin/components/sectionTitle/sectionTitle";
// // import ProductVariations from "@/admin/products/product/components/productVariations";

// interface ProductDataProps {
//   isSimpleProduct: boolean;
// }

// export default function ProductData({ isSimpleProduct }: ProductDataProps) {
//   const [value, setValue] = useState(ProductModel.product_type);

//   const handleChangePrice = (event: ChangeEvent<HTMLInputElement>) => {
//     ProductModel.price = parseFloat(event.target.value);
//   };

//   const handleChangeSalePrice = (event: ChangeEvent<HTMLInputElement>) => {
//     ProductModel.sale_price = parseFloat(event.target.value);
//   };

//   const handleChangeSku = (event: ChangeEvent<HTMLInputElement>) => {
//     ProductModel.sku = event.target.value;
//   };

//   const handleChangeStock = (event: ChangeEvent<HTMLInputElement>) => {
//     ProductModel.quantity = parseFloat(event.target.value);
//   };

//   const [selectedSize, setSelectedSize] = useState<string | null>(null);
//   const [selectedColor, setSelectedColor] = useState<string | null>(null);

//   const handleSizeChange = (event: ChangeEvent<HTMLInputElement>) => {
//     setSelectedSize(event.target.value);
//   };

//   const handleColorChange = (event: ChangeEvent<HTMLInputElement>) => {
//     setSelectedColor(event.target.value);
//   };

//   return (
//     <Box>
//       <Stack direction="row" spacing={2}>
//         <TextField
//           label="Price"
//           variant="outlined"
//           onChange={handleChangePrice}
//         />
//         <TextField
//           label="Sale Price"
//           variant="outlined"
//           onChange={handleChangeSalePrice}
//         />
//         <TextField label="Sku" variant="outlined" onChange={handleChangeSku} />
//         <TextField
//           label="Stock"
//           variant="outlined"
//           onChange={handleChangeStock}
//         />
//       </Stack>
//       <SectionTitle title="Attributes" />

//       <Stack spacing={2}>
//         <FormControl component="fieldset">
//           <FormLabel>Size</FormLabel>

//           <RadioGroup
//             row
//             aria-label="size"
//             name="size"
//             value={selectedSize}
//             onChange={handleSizeChange}
//           >
//             <FormControlLabel value="small" control={<Radio />} label="Small" />
//             <FormControlLabel
//               value="medium"
//               control={<Radio />}
//               label="Medium"
//             />
//           </RadioGroup>
//         </FormControl>
//         <FormControl component="fieldset">
//           <FormLabel>Color</FormLabel>

//           <RadioGroup
//             row
//             aria-label="color"
//             name="color"
//             value={selectedColor}
//             onChange={handleColorChange}
//           >
//             <FormControlLabel value="black" control={<Radio />} label="Black" />
//             <FormControlLabel value="red" control={<Radio />} label="Red" />
//           </RadioGroup>
//         </FormControl>
//       </Stack>

//       {/* {!isSimpleProduct && (
//         <ProductVariations size={selectedSize} color={selectedColor} />
//         // <ProductVariations sizes={checkedSizes} colors={checkedColors} />
//       )} */}
//     </Box>
//   );
// }
