"use client";
import { SetStateAction, Dispatch } from "react";
import { TextField } from "@mui/material";
import WysiwygEditor from "@/admin/components/wysiwgEditor/wysiwgEditor";

import { IProduct } from "@/types/productTypes";

interface ProductBasicFieldsProps {
  productModel: IProduct;
  setProductModel: Dispatch<SetStateAction<IProduct>>;
}

function ProductBasicFields({
  productModel,
  setProductModel,
}: ProductBasicFieldsProps) {
  const handleDescriptionChange = (newContent: string) => {
    setProductModel({ ...productModel, description: newContent });
  };

  const handleShortDescriptionChange = (newContent: string) => {
    setProductModel({ ...productModel, short_description: newContent });
  };

  return (
    <>
      <TextField
        sx={{ margin: "10px 0" }}
        fullWidth
        label="Name*"
        multiline
        value={productModel.name}
        onChange={(e) =>
          setProductModel({ ...productModel, name: e.target.value })
        }
      />
      <WysiwygEditor
        label="Description"
        value={productModel.description}
        onChange={handleDescriptionChange}
        error={false}
      />
      <WysiwygEditor
        label="Short Description"
        value={productModel.short_description}
        onChange={handleShortDescriptionChange}
        error={false}
      />
    </>
  );
}

export default ProductBasicFields;

// import { useMemo } from "react";

// function ProductBasicFields({
//   productModel,
//   setProductModel,
// }: ProductBasicFieldsProps) {
//   // Memoize the entire component using useMemo
//   const memoizedComponent = useMemo(() => {
//     console.log("Rendering ProductBasicFields");

//     const handleDescriptionChange = (newContent: string) => {
//       setProductModel({ ...productModel, description: newContent });
//     };

//     const handleShortDescriptionChange = (newContent: string) => {
//       setProductModel({ ...productModel, shortDescr: newContent });
//     };

//     return (
//       <>
//         <TextField
//           sx={{ margin: "10px 0" }}
//           fullWidth
//           label="Name"
//           multiline
//           value={productModel.name}
//           onChange={(e) => setProductModel({ ...productModel, name: e.target.value })}
//         />
//         <WysiwygEditor
//           label="Description"
//           value={productModel.description}
//           onChange={handleDescriptionChange}
//           error={false}
//         />
//         <WysiwygEditor
//           label="Short Description"
//           value={productModel.shortDescr}
//           onChange={handleShortDescriptionChange}
//           error={false}
//         />
//       </>
//     );
//   }, [productModel, setProductModel]);

//   return memoizedComponent;
// }

// export default memo(ProductBasicFields);
