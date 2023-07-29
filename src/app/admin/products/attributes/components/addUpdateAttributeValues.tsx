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
import ClearIcon from "@mui/icons-material/Clear";
import SaveIcon from "@mui/icons-material/Save";

import DataTable from "@/admin/components/table/table";
import ModalDialog from "@/admin/components/dialog/ModalDialog";

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
  const [isEditState, setIsEditState] = useState<{
    isEditMode: boolean;
    editId: number | null;
  }>({ isEditMode: false, editId: null });
  const [attributeValues, setAttributeValues] = useState<IAttributeValues[]>(
    []
  );
  const [attributeValueName, setAttributeValueName] = useState("");
  const [attributeValueNameToUpdate, setAttributeValueNameToUpdate] =
    useState("");
  const [isConfirmedDialogOpen, setIsConfirmedDialogOpen] = useState<{
    open: boolean;
    id: number | null;
  }>({ open: false, id: null });
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
  }, [atr_id, pagination]);

  const handleAddAttributeValue = async (name: string) => {
    if (!name || !atr_id) return;
    setIsLoading(true);
    addAttributeValue(name, atr_id).then((response) => {
      if (response && response.completed) {
        // setActionMessage({ open: true, message: "Attribute Added!" });
        fetchAttributes();
      }
    });
  };

  const handleUpdateAttributeValue = async (name: string, id: number) => {
    if (!name || !id) return;
    setIsLoading(true);
    try {
      const response = await updateAttributeValue(name, id);
      if (response && response.completed) {
        setIsEditState({ isEditMode: false, editId: null });
        fetchAttributes();
      }
    } catch (error) {
      // Handle error if needed
    }
    // updateAttributeValue(name, id).then((response) => {
    //   if (response && response.completed) {
    //     // setActionMessage({ open: true, message: "Attribute Added!" });
    //     setIsEditState({
    //       isEditMode: false,
    //       editId: null,
    //     });
    //     fetchAttributes();
    //   }
    // });
  };

  const handleDeleteAttriubteValue = async (id: number | null) => {
    setIsLoading(true);
    if (!id) return;
    try {
      await deleteAttributeValue(id);
      handleCloseDialog();
      fetchAttributes();
    } catch (error) {
      // Handle error if needed
    }
    // deleteAttributeValue(id).then((response) => {
    //   // setActionMessage({ open: true, message: "Attribute Deleted!" });
    //   handleCloseDialog();
    //   fetchAttributes();
    // });
  };

  const handleCloseDialog = () => {
    setIsConfirmedDialogOpen({ open: false, id: null });
  };

  useEffect(() => {
    fetchAttributes();
  }, [atr_id, pagination]);

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
                disabled={attributeValueName ? false : true}
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
                    <TableCell>
                      {isEditState.isEditMode &&
                      isEditState.editId === value.id ? (
                        <TextField
                          sx={{ margin: 0 }}
                          variant="standard"
                          size="small"
                          margin="normal"
                          autoFocus
                          defaultValue={value.name}
                          onChange={(e) =>
                            setAttributeValueNameToUpdate(e.target.value)
                          }
                        />
                      ) : (
                        value.name
                      )}
                    </TableCell>
                    <TableCell align="right" sx={{ display: "flex" }}>
                      <Stack
                        direction="row"
                        spacing={1}
                        sx={{ marginLeft: "auto" }}
                      >
                        {isEditState.isEditMode &&
                        isEditState.editId === value.id ? (
                          <>
                            <IconButton
                              aria-label="save"
                              color="primary"
                              onClick={() =>
                                handleUpdateAttributeValue(
                                  attributeValueNameToUpdate,
                                  value.id
                                )
                              }
                            >
                              <SaveIcon />
                            </IconButton>
                            <IconButton
                              aria-label="cancel"
                              color="secondary"
                              onClick={() =>
                                setIsEditState({
                                  isEditMode: false,
                                  editId: null,
                                })
                              }
                            >
                              <ClearIcon />
                            </IconButton>{" "}
                          </>
                        ) : (
                          <>
                            <IconButton
                              aria-label="edit"
                              onClick={() =>
                                setIsEditState({
                                  isEditMode: true,
                                  editId: value.id,
                                })
                              }
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              aria-label="delete"
                              color="error"
                              onClick={() =>
                                setIsConfirmedDialogOpen({
                                  open: true,
                                  id: value.id,
                                })
                              }
                            >
                              <DeleteIcon />
                            </IconButton>{" "}
                          </>
                        )}
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </DataTable>
            )}
          </Paper>
        </Grid>
      </Grid>
      <ModalDialog
        title={`Are you sure you want to delete "${
          attributeValues?.find((item) => item.id === isConfirmedDialogOpen.id)
            ?.name || null
        }"`}
        open={isConfirmedDialogOpen.open}
        handleCloseDialog={handleCloseDialog}
      >
        <Stack direction="row" spacing={2}>
          <Button variant="contained" onClick={handleCloseDialog}>
            No
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteAttriubteValue(isConfirmedDialogOpen.id);
              handleCloseDialog();
            }}
          >
            Yes
          </Button>
        </Stack>
      </ModalDialog>
    </>
  );
}
