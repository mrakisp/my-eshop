"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import {
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
  TableRow,
  IconButton,
  TableCell,
  Stack,
  Skeleton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import DataTable from "@/admin/components/table/table";

import { IAttributeValues } from "@/types/attributesTypes";

import {
  getAttributeValues,
  addAttributeValue,
  updateAttributeValue,
  deleteAttributeValue,
} from "@/services/attributes";

const tableColumns = [
  { label: "Value Name", align: "left" },
  { label: "Actions", align: "right" },
];

interface AddUpdateAttributeValues {
  name: string | null;
  atr_id: number | null;
}

export default function AddUpdateAttributeValues({
  name,
  atr_id,
}: AddUpdateAttributeValues) {
  const [isLoading, setIsLoading] = useState(false);
  const [isEditState, setIsEditState] = useState(false);
  const [attributeValues, setAttributeValues] = useState<IAttributeValues[]>(
    []
  );
  const [attributeValueName, setAttributeValueName] = useState("");
  const [pagination, setPagination] = useState({ page: 0, perPage: 30 });
  const [paginationTotalCount, setPaginationTotalCount] = useState(0);

  const fetchAttributes = useCallback(() => {
    if (!atr_id) return;
    setIsLoading(true);
    getAttributeValues(pagination, atr_id).then(
      (response: IAttributeValues[]) => {
        setAttributeValues(response);
        if (
          response &&
          response[0] &&
          "totalAttributeValuesCount" in response[0]
        ) {
          const totalCount: any = response[0];
          setPaginationTotalCount(
            parseInt(totalCount.totalAttributeValuesCount)
          );
        }
        setIsLoading(false);
      }
    );
  }, [pagination]);

  const handleAddAttributeValue = (name: string) => {
    if (!name || !atr_id) return;
    setIsLoading(true);
    addAttributeValue(name, atr_id).then((response) => {
      if (response && response.completed) {
        // setActionMessage({ open: true, message: "Attribute Added!" });
        fetchAttributes();
      }
    });
  };

  useEffect(() => {
    fetchAttributes();
  }, [pagination]);

  const memoizedAttributeValues = useMemo(
    () => attributeValues,
    [attributeValues]
  );
  const memoizedColumns = useMemo(() => tableColumns, []);

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12} md={12} lg={5}>
          <Paper elevation={3} sx={{ padding: "15px 25px" }}>
            <Typography variant="h6">Add new {name}</Typography>

            <TextField
              fullWidth
              label="Name*"
              variant="outlined"
              margin="normal"
              value={attributeValueName}
              helperText={`Name of the ${name}. (Required)`}
              onChange={(e) => setAttributeValueName(e.target.value)}
            />

            <div>
              <Button
                variant="contained"
                sx={{ marginTop: "35px" }}
                // disabled={attributeValueName ? false : true}
                onClick={() => handleAddAttributeValue(attributeValueName)}
              >
                Add {name}
              </Button>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} md={12} lg={7}>
          <Paper elevation={3} sx={{ padding: "15px 25px" }}>
            {isLoading ? (
              <Skeleton height={300} />
            ) : (
              <DataTable columns={memoizedColumns}>
                {memoizedAttributeValues?.map((value) => (
                  <TableRow
                    key={value.id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell>{value.name}</TableCell>
                    <TableCell align="right" sx={{ display: "flex" }}>
                      <Stack
                        direction="row"
                        spacing={1}
                        sx={{ marginLeft: "auto" }}
                      >
                        <IconButton
                          aria-label="edit"
                          // onClick={() => setIsEditState(true)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          color="error"
                          // onClick={() =>
                          //   setIsConfirmedDialogOpen({
                          //     open: true,
                          //     id: attribute.id,
                          //   })
                          // }
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </DataTable>
            )}
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
