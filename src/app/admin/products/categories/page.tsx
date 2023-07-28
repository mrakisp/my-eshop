"use client";
import { useState, useEffect, useCallback, useMemo, memo } from "react";
// import { debounce } from "lodash";

import { Grid, Paper, Typography } from "@mui/material";

import AddCategory from "./components/addUpdateCategory";
import CategoriesTable from "./components/categoriesTable";
import ModalDialog from "@/admin/components/dialog/ModalDialog";
import Search from "@/admin/components/search/search";
import ActionMessage from "@/admin/components/snackBar/actionMessage";
// import PaginationBar from "@/admin/components/pagination/pagination";

// import { setLocalStorageUtil } from "@/utils/setGetLocalStorage";

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

function Categories() {
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<ICategories[]>([]);

  const [searchCategory, setSearchCategory] = useState<string>();
  const [isUpdateCategoryState, setIsUpdateCategoryState] = useState(false);
  const [categoryToBeUpdated, setCategoryToBeUpdated] = useState<ICategories>();
  const [pagination, setPagination] = useState({ page: 0, perPage: 100 });
  // const [categoriesOptions, setCategoriesOptions] = useState<ICategories[]>([]); //TODO
  // const [paginationTotalCount, setPaginationTotalCount] = useState(0); //TODO
  const [actionMessage, setActionMessage] = useState<{
    open: boolean;
    message: string;
  }>({
    open: false,
    message: "",
  });

  const fetchCategories = useCallback(() => {
    setIsLoading(true);
    getCategories(pagination).then((response: ICategories[]) => {
      setCategories(response);
      // setLocalStorageUtil("categories", JSON.stringify(response), false);
      // setCategoriesOptions(response);
      if (response && response[0] && "totalCategoriesCount" in response[0]) {
        // const totalCount: any = response[0]; //TODO
        // setPaginationTotalCount(parseInt(totalCount.totalCategoriesCount)); //TODO
      }
      if (searchCategory) setSearchCategory("");
      setIsLoading(false);
    });
  }, [pagination, searchCategory]);

  const handleSaveNewCategory = async (
    parentCategory: number | null,
    categoryName: string,
    categoryDescr: string | null,
    showType: string
    // categoryImage: string | null //TODO
  ) => {
    setIsLoading(true);
    addCategory(
      categoryName,
      categoryDescr,
      parentCategory,
      showType
      // categoryImage
    ).then((response) => {
      if (response && response.completed) {
        setActionMessage({ open: true, message: "Category Added!" });
        fetchCategories();
      }
    });
  };

  const handleUpdateCategory = async (
    parentCategory: number | null,
    categoryName: string,
    categoryDescr: string | null,
    categoryId: number,
    showType: string
  ) => {
    setIsLoading(true);
    updateCategory(
      categoryName,
      categoryDescr,
      parentCategory,
      categoryId,
      showType
    ).then((response) => {
      if (response && response.completed) {
        setActionMessage({ open: true, message: "Category Updated!" });
        setIsUpdateCategoryState(false);
        fetchCategories();
      }
    });
  };

  const handleEdit = async (categoryId: number) => {
    getCategory(categoryId).then((response: ICategories[]) => {
      if (response) setCategoryToBeUpdated(response[0]);
      setIsUpdateCategoryState(true);
    });
  };

  const handleDelete = async (categoryId: number) => {
    setIsLoading(true);
    deleteCategory(categoryId).then((response: ICategories[]) => {
      setActionMessage({ open: true, message: "Category Deleted!" });

      fetchCategories();
    });
  };

  const handleDeleteMass = async (categoryIds: number[]) => {
    setIsLoading(true);
    deleteCategories(categoryIds).then((response: ICategories[]) => {
      setActionMessage({ open: true, message: "Categories Deleted!" });
      fetchCategories();
    });
  };

  const handleCloseDialog = () => {
    setIsUpdateCategoryState(false);
  };

  const handleSearch = useCallback(
    (searchValue: string) => {
      setSearchCategory(searchValue);

      if (searchValue) {
        setIsLoading(true);
        searchCategories(searchValue).then((response: ICategories[]) => {
          setCategories(response);
          setIsLoading(false);
        });
      } else {
        fetchCategories();
      }
    },
    [fetchCategories]
  );

  //TODO if pagination enabled need to fetch new categories
  // const fetchParentCategories = useMemo(
  //   () =>
  //     debounce((value: string) => {
  //       searchCategories(value).then((response: ICategories[]) => {
  //         if (response && response[0])
  //           setCategoriesOptions([...categoriesOptions, response[0]]);
  //       });
  //     }, 600),
  //   [categoriesOptions]
  // );

  useEffect(() => {
    fetchCategories();
  }, [pagination]);

  const memoizedCategories = useMemo(() => categories, [categories]);

  return (
    <>
      <Paper elevation={3} sx={{ padding: "15px 25px", margin: "0 0 25px 0" }}>
        <Typography variant="h5">Product Categories</Typography>
      </Paper>

      <Grid container spacing={4}>
        <Grid item xs={12} md={12} lg={5}>
          <Paper elevation={3} sx={{ padding: "15px 25px" }}>
            <AddCategory
              handleSave={handleSaveNewCategory}
              categories={categories}
              // categories={categoriesOptions} //TODO
              // fetchParentCategories={fetchParentCategories} //TODO
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={12} lg={7}>
          <Paper elevation={3} sx={{ padding: "15px 25px" }}>
            <Search handleSearch={handleSearch} reset={actionMessage.open} />
            <CategoriesTable
              data={memoizedCategories}
              // data={categories}
              isLoading={isLoading}
              searchCategory={searchCategory}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              handleDeleteMass={handleDeleteMass}
            />
            {/* {!searchCategory && ( //TODO
              <PaginationBar
                pagination={pagination}
                setPagination={setPagination}
                paginationTotalCount={paginationTotalCount}
              />
            )} */}
          </Paper>
        </Grid>
      </Grid>
      <ModalDialog
        title="Update Category"
        open={isUpdateCategoryState}
        handleCloseDialog={handleCloseDialog}
      >
        <AddCategory
          handleUpdate={handleUpdateCategory}
          isUpdateCategory={isUpdateCategoryState}
          data={categoryToBeUpdated}
          categories={categories}
          // categories={categoriesOptions} //TODO
          // fetchParentCategories={fetchParentCategories} //TODO
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

export default memo(Categories);
