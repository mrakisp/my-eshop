"use client";

import { useState, useEffect } from "react";

import {
  Grid,
  Paper,
  TableCell,
  TableRow,
  Typography,
  IconButton,
  Stack,
  Skeleton,
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
import DataTable from "@/admin/components/table/table";
import ModalDialog from "@/admin/components/dialog/ModalDialog";
import Search from "@/admin/components/search/search";
import ActionMessage from "@/admin/components/snackBar/actionMessage";

const tableColumns = [
  { label: "Attribte Name", align: "left" },
  { label: "Actions", align: "right" },
];

export default function Attributes() {
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdateAttribute, setIsUpdateAttribute] = useState(false);
  const [isAttributeAdded, setIsAttributeAdded] = useState(false);
  const [isAttributeUpdated, setIsAttributeUpdated] = useState(false);
  const [isAttributeDeleted, setIsAttributeDeleted] = useState(false);
  const [attributeToBeUpdated, setAttributeToBeUpdated] =
    useState<IAttributes>();
  const [attributes, setAttributes] = useState<IAttributes[]>([]);
  const [searchAttribute, setSearchAttribute] = useState<string>();
  const [pagination, setPagination] = useState({ page: 0, perPage: 30 });
  const [paginationTotalCount, setPaginationTotalCount] = useState(0);

  const fetchAttributes = () => {
    setIsLoading(true);
    getAttributes(pagination).then((response: IAttributes[]) => {
      setAttributes(response);
      if (response && response[0] && "totalAttributesCount" in response[0]) {
        const totalCount: any = response[0];
        setPaginationTotalCount(parseInt(totalCount.totalCategoriesCount));
      }
      if (searchAttribute) setSearchAttribute("");
      setIsLoading(false);
    });
  };

  const handleSaveAttribute = async (attrName: string) => {
    addAttribute(attrName).then((response) => {
      if (response && response.completed) {
        setIsAttributeAdded(true);
        fetchAttributes();
      }
    });
  };

  const handleUpdateAttribute = async (attrName: string, attrId: number) => {
    updateAttribute(attrName, attrId).then((response) => {
      if (response && response.completed) {
        setIsAttributeUpdated(true);
        setIsUpdateAttribute(false);
        fetchAttributes();
      } else {
        //handleError
        //setErrorMessage(response.error.message);
      }
    });
  };

  const handleEditAttriubte = async (attrId: number) => {
    getAttribute(attrId).then((response) => {
      if (response) setAttributeToBeUpdated(response[0]);
      setIsUpdateAttribute(true);
    });
  };

  const handleDeleteAttriubte = async (attrId: number) => {
    deleteAttribute(attrId).then((response) => {
      setIsAttributeDeleted(true);
      fetchAttributes();
    });
  };

  const handleOpenAttriubteValues = async (
    attrId: number,
    attrName: string
  ) => {
    // addAttribute(attrName).then((response) => {
    //   if (response && response.completed) {
    //     fetchAttributes();
    //   }
    // });
  };

  const handleSearch = (searchValue: string) => {
    setSearchAttribute(searchValue);

    if (searchValue) {
      setIsLoading(true);
      searchAttributes(searchValue).then((response: IAttributes[]) => {
        setAttributes(response);
        setIsLoading(false);
      });
    } else {
      fetchAttributes();
    }
  };

  const handleCloseDialog = () => {
    setIsUpdateAttribute(false);
  };

  useEffect(() => {
    setIsClient(true);
    fetchAttributes();
  }, []);

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
                  reset={
                    isAttributeAdded || isAttributeUpdated || isAttributeDeleted
                  }
                />

                <DataTable columns={tableColumns}>
                  {attributes?.map((attribute) => (
                    <TableRow
                      key={attribute.name}
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
                          <IconButton
                            aria-label="edit"
                            onClick={() => handleEditAttriubte(attribute.id)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            aria-label="delete"
                            color="error"
                            onClick={() => handleDeleteAttriubte(attribute.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </DataTable>
              </>
            ) : (
              <Skeleton height={300} />
            )}
          </Paper>
        </Grid>
      </Grid>
      <ModalDialog
        title="Update Attribute"
        open={isUpdateAttribute}
        handleCloseDialog={handleCloseDialog}
      >
        <AddUpdateAttributes
          handleUpdateAttribute={handleUpdateAttribute}
          isUpdateAttribute={isUpdateAttribute}
          data={attributeToBeUpdated}
        />
      </ModalDialog>

      <ActionMessage
        open={isAttributeAdded}
        message={"Attribute Added!"}
        setOpen={setIsAttributeAdded}
      />
      <ActionMessage
        open={isAttributeUpdated}
        message={"Attribute Updated!"}
        setOpen={setIsAttributeUpdated}
      />
      <ActionMessage
        open={isAttributeDeleted}
        message={"Attribute Deleted!"}
        setOpen={setIsAttributeDeleted}
      />
    </>
  );
}
