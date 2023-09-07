"use client";

import { useState, useEffect, useCallback, useMemo, memo } from "react";

import {
  Grid,
  Paper,
  TableCell,
  TableRow,
  Typography,
  IconButton,
  Stack,
  Skeleton,
  Button,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";

import {
  getAttributes,
  addAttribute,
  getAttribute,
  updateAttribute,
  deleteAttribute,
  searchAttributes,
} from "@/services/attributes";

import { IAttributes } from "@/types/attributesTypes";

import AddUpdateAttributes from "./components/addUpdateAttributes";
import AddUpdateAttributeValues from "./components/addUpdateAttributeValues";
import DataTable from "@/admin/components/table/table";
import ModalDialog from "@/admin/components/dialog/ModalDialog";
import Search from "@/admin/components/search/search";
import ActionMessage from "@/admin/components/snackBar/actionMessage";
import PaginationBar from "@/admin/components/pagination/pagination";

const tableColumns = [
  { label: "Attribute Name", align: "left" },
  { label: "Actions", align: "right" },
];

function Attributes() {
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [actionMessage, setActionMessage] = useState<{
    open: boolean;
    message: string;
  }>({
    open: false,
    message: "",
  });
  const [isUpdateAttributeState, setIsUpdateAttributeState] = useState(false);
  const [isAddAttributeValuesState, setIsAddAttributeValuesState] = useState<{
    open: boolean;
    attrId: number | null;
    attrName: string | null;
  }>({ open: false, attrId: null, attrName: null });
  const [attributeToBeUpdated, setAttributeToBeUpdated] =
    useState<IAttributes>();
  const [attributes, setAttributes] = useState<IAttributes[]>([]);
  const [searchAttribute, setSearchAttribute] = useState<string>();
  const [isConfirmedDialogOpen, setIsConfirmedDialogOpen] = useState<{
    open: boolean;
    id: number | null;
  }>({ open: false, id: null });
  const [pagination, setPagination] = useState({ page: 0, perPage: 30 });
  const [paginationTotalCount, setPaginationTotalCount] = useState(0);

  const fetchAttributes = useCallback(() => {
    setIsLoading(true);
    getAttributes(pagination).then((response: IAttributes[]) => {
      setAttributes(response);
      if (response && response[0] && "totalAttributesCount" in response[0]) {
        const totalCount: any = response[0];
        setPaginationTotalCount(parseInt(totalCount.totalAttributesCount));
      }
      // if (searchAttribute) setSearchAttribute("");
      setIsLoading(false);
    });
  }, [pagination, searchAttribute]);

  const handleSaveAttribute = async (attrName: string) => {
    setIsLoading(true);
    addAttribute(attrName).then((response) => {
      if (response && response.completed) {
        setActionMessage({ open: true, message: "Attribute Added!" });
        fetchAttributes();
      }
    });
  };

  const handleUpdateAttribute = async (attrName: string, attrId: number) => {
    setIsLoading(true);
    updateAttribute(attrName, attrId).then((response) => {
      if (response && response.completed) {
        setActionMessage({ open: true, message: "Attribute Updated!" });
        setIsUpdateAttributeState(false);
        fetchAttributes();
      }
    });
  };

  const handleEditAttriubte = async (attrId: number) => {
    getAttribute(attrId).then((response) => {
      if (response) setAttributeToBeUpdated(response[0]);
      setIsUpdateAttributeState(true);
    });
  };

  const handleDeleteAttriubte = async (attrId: number | null) => {
    setIsLoading(true);
    if (!attrId) return;
    deleteAttribute(attrId).then((response) => {
      setActionMessage({ open: true, message: "Attribute Deleted!" });
      setIsConfirmedDialogOpen({ open: false, id: attrId });
      fetchAttributes();
    });
  };

  const handleOpenAttriubteValues = async (
    attrId: number,
    attrName: string
  ) => {
    setIsAddAttributeValuesState({
      open: true,
      attrId: attrId,
      attrName: attrName,
    });
  };

  const handleSearch = useCallback(
    (searchValue: string) => {
      setSearchAttribute(searchValue);

      if (searchValue) {
        searchAttributes(searchValue).then((response: IAttributes[]) => {
          setAttributes(response);
        });
      } else {
        fetchAttributes();
      }
    },
    [fetchAttributes]
  );

  const handleCloseDialog = () => {
    setIsUpdateAttributeState(false);
  };

  useEffect(() => {
    setIsClient(true);
    fetchAttributes();
  }, [pagination]);

  const memoizedAttributes = useMemo(() => attributes, [attributes]);
  const memoizedColumns = useMemo(() => tableColumns, []);

  return (
    <>
      <Paper elevation={3} sx={{ padding: "15px 25px", margin: "0 0 25px 0" }}>
        <Typography variant="h5">Product Attributes</Typography>
      </Paper>

      <Grid container spacing={4}>
        <Grid item xs={12} md={12} lg={5}>
          <Paper elevation={3} sx={{ padding: "15px 25px" }}>
            <AddUpdateAttributes
              handleSaveAttribute={handleSaveAttribute}
              attributes={attributes}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={12} lg={7}>
          <Paper elevation={3} sx={{ padding: "15px 25px" }}>
            {isClient && !isLoading ? (
              <>
                <Search
                  handleSearch={handleSearch}
                  reset={actionMessage.open}
                />

                <DataTable
                  columns={memoizedColumns}
                  stickyHeader={true}
                  tableContainerMaxHeight={600}
                >
                  {memoizedAttributes?.map((attribute) => (
                    <TableRow
                      key={attribute.id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell>{attribute.name}</TableCell>
                      <TableCell align="right" sx={{ display: "flex" }}>
                        <Stack
                          direction="row"
                          spacing={1}
                          sx={{ marginLeft: "auto" }}
                        >
                          <Tooltip title="Add values" arrow placement="top">
                            <IconButton
                              aria-label="add"
                              onClick={() =>
                                handleOpenAttriubteValues(
                                  attribute.id,
                                  attribute.name
                                )
                              }
                            >
                              <LibraryAddIcon />
                            </IconButton>
                          </Tooltip>
                          <IconButton
                            aria-label="edit"
                            onClick={() => handleEditAttriubte(attribute.id)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            aria-label="delete"
                            color="error"
                            onClick={() =>
                              setIsConfirmedDialogOpen({
                                open: true,
                                id: attribute.id,
                              })
                            }
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </DataTable>
                {!searchAttribute && (
                  <PaginationBar
                    pagination={pagination}
                    setPagination={setPagination}
                    paginationTotalCount={paginationTotalCount}
                  />
                )}
              </>
            ) : (
              <Skeleton height={300} />
            )}
          </Paper>
        </Grid>
      </Grid>
      <ModalDialog
        title="Update Attribute"
        open={isUpdateAttributeState}
        handleCloseDialog={handleCloseDialog}
      >
        <AddUpdateAttributes
          handleUpdateAttribute={handleUpdateAttribute}
          isUpdateAttribute={isUpdateAttributeState}
          data={attributeToBeUpdated}
        />
      </ModalDialog>

      <ModalDialog
        title={`Are you sure you want to delete "${
          attributes?.find((item) => item.id === isConfirmedDialogOpen.id)
            ?.name || null
        }" attribute and its values?`}
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
              handleDeleteAttriubte(isConfirmedDialogOpen.id);
              setIsConfirmedDialogOpen({
                open: false,
                id: isConfirmedDialogOpen.id,
              });
            }}
          >
            Yes
          </Button>
        </Stack>
      </ModalDialog>

      <ModalDialog
        title={`Add new value's to "${isAddAttributeValuesState.attrName}" attribute`}
        open={isAddAttributeValuesState.open}
        fullscreen={true}
        handleCloseDialog={() =>
          setIsAddAttributeValuesState({
            ...isAddAttributeValuesState,
            open: false,
          })
        }
      >
        <AddUpdateAttributeValues
          name={isAddAttributeValuesState.attrName}
          atr_id={isAddAttributeValuesState.attrId}
        />
      </ModalDialog>

      <ActionMessage
        open={actionMessage.open}
        message={actionMessage.message}
        setOpen={(open: any) => setActionMessage({ ...actionMessage, open })}
      />
    </>
  );
}

export default memo(Attributes);
