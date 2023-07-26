"use client";
import { useState, useEffect } from "react";
import { TextField, Button, Typography } from "@mui/material";

import { IAttributes } from "@/types/attributesTypes";

interface AddattributeProps {
  handleSaveAttribute?: (attributeName: string) => void;
  handleUpdateAttribute?: (attributeName: string, attributeId: number) => void;
  isUpdateAttribute?: boolean;
  data?: IAttributes | undefined;
  attributes?: IAttributes[];
}

export default function AddUpdateAttributes({
  handleSaveAttribute,
  handleUpdateAttribute,
  isUpdateAttribute,
  data,
  attributes,
}: AddattributeProps) {
  const [attributeName, setattributeName] = useState(
    isUpdateAttribute && data ? data.name : ""
  );
  const [attributeId] = useState(isUpdateAttribute && data ? data.id : null);

  const reset = () => {
    setattributeName("");
  };

  useEffect(() => {
    if (!isUpdateAttribute) reset();
  }, [attributes]);

  return (
    <>
      {!isUpdateAttribute && (
        <Typography variant="h6">Add new attribute</Typography>
      )}

      <TextField
        fullWidth
        label="Name*"
        variant="outlined"
        margin="normal"
        value={attributeName}
        helperText="Name of the attribute. For example color, size (Required)"
        onChange={(e) => setattributeName(e.target.value)}
      />

      <div>
        {!isUpdateAttribute ? (
          <Button
            variant="contained"
            sx={{ marginTop: "35px" }}
            disabled={attributeName ? false : true}
            onClick={() => handleSaveAttribute?.(attributeName)}
          >
            Add new attribute
          </Button>
        ) : (
          <Button
            variant="contained"
            sx={{ marginTop: "35px" }}
            disabled={attributeName ? false : true}
            onClick={() => handleUpdateAttribute?.(attributeName, attributeId!)}
          >
            Update attribute
          </Button>
        )}
      </div>
    </>
  );
}
