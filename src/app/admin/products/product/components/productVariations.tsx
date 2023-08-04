import {
  Dispatch,
  SetStateAction,
  ChangeEvent,
  useEffect,
  useState,
} from "react";
import {
  Box,
  InputAdornment,
  TableCell,
  TableRow,
  TextField,
  IconButton,
  Tooltip,
} from "@mui/material";
import VerticalAlignBottomIcon from "@mui/icons-material/VerticalAlignBottom";
import DataTable from "@/admin/components/table/table";
import { IProductVariations } from "@/types/productTypes";

const tableColumns = [
  { label: "Variation", align: "left" },
  { label: "Price (*)", align: "left" },
  { label: "Sale Price", align: "left" },
  { label: "Unique Sku (*)", align: "left" },
  { label: "Stock (*)", align: "left" },
];

interface ProductVariationsMultipleProps {
  parsedAttributes: {
    attribute_values: any;
    attribute_id: number;
    attribute_name: string;
  }[];
  checkedAttributes: number[];
  variationsModel: IProductVariations[];
  setVariationsModel: Dispatch<SetStateAction<IProductVariations[]>>;
  sku?: string | undefined;
}

export default function ProductVariationsMultiple({
  parsedAttributes,
  checkedAttributes,
  variationsModel,
  sku,
  setVariationsModel,
}: ProductVariationsMultipleProps) {
  const [parentSku, setParentSku] = useState(sku);
  const variations = parsedAttributes[0]?.attribute_values.filter((attr: any) =>
    checkedAttributes.includes(attr.id)
  );

  const handleInputChange =
    (index: number, field: keyof IProductVariations) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      const updatedVariations = [...variationsModel];
      const parsedValue =
        value !== ""
          ? field === "stock"
            ? parseInt(value)
            : parseFloat(value)
          : null;

      updatedVariations[index] = {
        ...updatedVariations[index],
        atr_id: parsedAttributes[0].attribute_id,
        atr_values_id: checkedAttributes[index],
        [field]: field === "sku" ? value : parsedValue,
      };
      setVariationsModel(updatedVariations);
    };

  const handleCopyValues = (field: keyof IProductVariations) => {
    const valueToCopy: any = variationsModel[0]?.[field] || null;

    const updatedVariations = variationsModel.map((variation, index) =>
      index === 0 ? variation : { ...variation, [field]: valueToCopy }
    );

    setVariationsModel(updatedVariations);
  };

  useEffect(() => {
    if (variations) {
      const emptyRows = variations.map((variation: any, index: number) => ({
        atr_id: parsedAttributes[0].attribute_id,
        atr_values_id: checkedAttributes[index],
        price: variationsModel[index]?.price || null,
        sale_price: variationsModel[index]?.sale_price || null,
        sku: variationsModel[index]?.sku
          ? variationsModel[index]?.sku
          : sku
          ? (sku + "-" + variation.name).toLowerCase()
          : "",
        stock: variationsModel[index]?.stock || 0,
      }));
      setVariationsModel(emptyRows);
    }
  }, [checkedAttributes]);

  useEffect(() => {
    if (parentSku !== sku) {
      const updatedVariations = variationsModel.map((variation, index) => {
        const newName = sku
          ? `${sku}-${variations[index].name.toLowerCase()}`
          : "";
        return {
          ...variation,
          sku: newName,
        };
      });

      setVariationsModel(updatedVariations);
      setParentSku(sku);
    }
  }, [sku]);

  return (
    <Box>
      <DataTable columns={tableColumns}>
        {variations?.map((variation: any, index: number) => (
          <TableRow
            key={index}
            sx={{
              "&:last-child td, &:last-child th": { border: 0 },
            }}
          >
            <TableCell>{variation?.name}</TableCell>
            <TableCell>
              <TextField
                label=""
                required
                size="small"
                variant="outlined"
                value={variationsModel[index]?.price || ""}
                InputProps={{
                  inputProps: {
                    min: 0,
                  },
                  endAdornment: (
                    <>
                      <InputAdornment position="end">€</InputAdornment>
                      {index === 0 && variations.length > 1 && (
                        <InputAdornment position="end">
                          <Tooltip
                            title="Copy the price to other variations below"
                            placement="top"
                            arrow
                          >
                            <IconButton
                              size="small"
                              onClick={() => handleCopyValues("price")}
                            >
                              <VerticalAlignBottomIcon />
                            </IconButton>
                          </Tooltip>
                        </InputAdornment>
                      )}
                    </>
                  ),
                }}
                type="number"
                onChange={handleInputChange(index, "price")}
              />
            </TableCell>
            <TableCell>
              <TextField
                label=""
                required
                size="small"
                variant="outlined"
                value={variationsModel[index]?.sale_price || ""}
                InputProps={{
                  inputProps: {
                    min: 0,
                  },
                  endAdornment: (
                    <>
                      <InputAdornment position="end">€</InputAdornment>
                      {index === 0 && variations.length > 1 && (
                        <InputAdornment position="end">
                          <Tooltip
                            title="Copy the sale price to other variations below"
                            placement="top"
                            arrow
                          >
                            <IconButton
                              size="small"
                              onClick={() => handleCopyValues("sale_price")}
                            >
                              <VerticalAlignBottomIcon />
                            </IconButton>
                          </Tooltip>
                        </InputAdornment>
                      )}
                    </>
                  ),
                }}
                type="number"
                onChange={handleInputChange(index, "sale_price")}
              />
            </TableCell>
            <TableCell>
              <TextField
                label=""
                required
                size="small"
                variant="outlined"
                value={
                  variationsModel[index]?.sku
                    ? variationsModel[index]?.sku
                    : sku
                    ? (sku + "-" + variation.name).toLowerCase()
                    : ""
                }
                onChange={handleInputChange(index, "sku")}
              />
            </TableCell>
            <TableCell>
              <TextField
                label=""
                required
                size="small"
                variant="outlined"
                value={variationsModel[index]?.stock || 0}
                type="number"
                onChange={handleInputChange(index, "stock")}
              />
            </TableCell>
          </TableRow>
        ))}
      </DataTable>
    </Box>
  );
}
