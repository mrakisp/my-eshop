"use client";
import { useState, useEffect } from "react";

import { Grid, Paper, Typography } from "@mui/material";

import AddCategory from "./components/addUpdateCategory";
import CategoriesTable from "./components/categoriesTable";
import ModalDialog from "@/admin/components/dialog/ModalDialog";
import Search from "@/admin/components/search/search";
import ActionMessage from "@/admin/components/snackBar/actionMessage";
// import useErrorMessage from "@/hooks/handleError";
import { ICategories } from "@/types/categoriesTypes";
import {
  getCategories,
  searchCategories,
  getCategory,
  addCategory,
  updateCategory,
  deleteCategory,
  deleteCategories,
} from "@/services/categories";

export default function Categories() {
  // const [errorMessage, setErrorMessage] = useErrorMessage();
  const [isLoading, setIsLoading] = useState(true);
  const [isCategoryAdded, setIsCategoryAdded] = useState(false);
  const [isCategoryUpdated, setIsCategoryUpdated] = useState(false);
  const [isCategoryDeleted, setIsCategoryDeleted] = useState(false);
  const [categories, setCategories] = useState<ICategories[]>([]);
  const [searchCategory, setSearchCategory] = useState<string>();
  const [isUpdateCategory, setIsUpdateCategory] = useState(false);
  const [categoryToBeUpdated, setCategoryToBeUpdated] = useState<ICategories>();

  const fetchCategories = () => {
    getCategories().then((response: ICategories[]) => {
      setCategories(response);
      setIsLoading(false);
      if (searchCategory) setSearchCategory("");
    });
  };

  const handleSaveNewCategory = async (
    parentCategory: number | null,
    categoryName: string,
    categoryDescr: string | null
    // categoryImage: string | null
  ) => {
    setIsLoading(true);

    addCategory(
      categoryName,
      categoryDescr,
      parentCategory
      // categoryImage
    ).then((response) => {
      if (response && response.completed) {
        setIsCategoryAdded(true);
        fetchCategories();
      } else {
        //handleError
        //setErrorMessage(response.error.message);
      }
    });
  };

  const handleUpdateCategory = (
    parentCategory: number | null,
    categoryName: string,
    categoryDescr: string | null,
    categoryId: number
  ) => {
    updateCategory(
      categoryName,
      categoryDescr,
      parentCategory,
      categoryId
    ).then((response) => {
      if (response && response.completed) {
        setIsCategoryUpdated(true);
        setIsUpdateCategory(false);
        fetchCategories();
      } else {
        //handleError
        //setErrorMessage(response.error.message);
      }
    });
  };

  const handleEdit = (categoryId: number) => {
    getCategory(categoryId).then((response: ICategories[]) => {
      if (response) setCategoryToBeUpdated(response[0]);
      setIsUpdateCategory(true);
      fetchCategories();
    });
  };

  const handleDelete = (categoryId: number) => {
    deleteCategory(categoryId).then((response: ICategories[]) => {
      setIsCategoryDeleted(true);
      fetchCategories();
    });
  };

  const handleDeleteMass = (categoryIds: number[]) => {
    deleteCategories(categoryIds).then((response: ICategories[]) => {
      setIsCategoryDeleted(true);
      fetchCategories();
    });
  };

  const handleCloseDialog = () => {
    setIsUpdateCategory(false);
  };

  const handleSearch = (searchValue: string) => {
    setSearchCategory(searchValue);
    setIsLoading(true);
    if (searchValue) {
      searchCategories(searchValue).then((response: ICategories[]) => {
        setCategories(response);
        setIsLoading(false);
      });
    } else {
      fetchCategories();
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <Paper elevation={3} sx={{ padding: "15px 25px", margin: "0 0 25px 0" }}>
        <Typography variant="h5">Product Categories</Typography>
      </Paper>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6} lg={5}>
          <Paper elevation={3} sx={{ padding: "15px 25px" }}>
            <AddCategory
              handleSave={handleSaveNewCategory}
              categories={categories}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={7}>
          <Paper elevation={3} sx={{ padding: "15px 25px" }}>
            <Search
              handleSearch={handleSearch}
              reset={isCategoryAdded || isCategoryUpdated || isCategoryDeleted}
            />
            <CategoriesTable
              data={categories}
              isLoading={isLoading}
              searchCategory={searchCategory}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              handleDeleteMass={handleDeleteMass}
            />
          </Paper>
        </Grid>
      </Grid>
      <ModalDialog
        title="Update Category"
        open={isUpdateCategory}
        handleCloseDialog={handleCloseDialog}
      >
        <AddCategory
          handleUpdate={handleUpdateCategory}
          isUpdateCategory={isUpdateCategory}
          data={categoryToBeUpdated}
          categories={categories}
        />
      </ModalDialog>

      <ActionMessage
        open={isCategoryAdded}
        message={"Category Added!"}
        setOpen={setIsCategoryAdded}
      />
      <ActionMessage
        open={isCategoryUpdated}
        message={"Category Updated!"}
        setOpen={setIsCategoryUpdated}
      />
      <ActionMessage
        open={isCategoryDeleted}
        message={"Category Deleted!"}
        setOpen={setIsCategoryDeleted}
      />
    </>
  );
}
