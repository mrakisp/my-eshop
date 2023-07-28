"use client";
import { useState, useEffect, useMemo, memo } from "react";
import Image from "next/image";
import {
  Checkbox,
  FormControlLabel,
  Divider,
  Skeleton,
  IconButton,
  Stack,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { removeAccents } from "@/utils/utils";
import { ICategories } from "@/types/categoriesTypes";

import ModalDialog from "@/admin/components/dialog/ModalDialog";

import styles from "./categoriesTable.module.scss";

import placeholder from "@/assets/placeholder.png";

interface CategoriesTableProps {
  data: ICategories[];
  isLoading: boolean;
  searchCategory?: string;
  handleEdit: (categoryId: number) => void;
  handleDelete: (categoryId: number) => void;
  handleDeleteMass: (categoryIds: number[]) => void;
}

function CategoriesTable({
  data,
  isLoading,
  searchCategory,
  handleEdit,
  handleDelete,
  handleDeleteMass,
}: CategoriesTableProps) {
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [isTableHeadChecked, setIsTableHeadChecked] = useState(false);
  const [isConfirmedDialogOpen, setIsConfirmedDialogOpen] = useState(false);

  useEffect(() => {
    if (isTableHeadChecked) {
      const categoryIds = data.map((category) => category.category_id);
      setSelectedCategories(categoryIds);
    } else {
      setSelectedCategories([]);
    }
  }, [isTableHeadChecked, data]);

  const handleCheckboxChange = (categoryId: number) => {
    const selectedIndex = selectedCategories.indexOf(categoryId);
    let newSelectedCategories: number[] = [];

    if (selectedIndex === -1) {
      newSelectedCategories = [...selectedCategories, categoryId];
    } else {
      newSelectedCategories = selectedCategories.filter(
        (id) => id !== categoryId
      );
    }

    setSelectedCategories(newSelectedCategories);
  };

  const handleTableHeadCheckboxChange = () => {
    setIsTableHeadChecked(!isTableHeadChecked);
  };

  const handleCloseDialog = () => {
    setIsConfirmedDialogOpen(false);
  };

  const renderCategories = (
    parentId: number | null,
    isChild: boolean = false
  ): JSX.Element[] => {
    //TODO
    // const parentCategoryExist = data.some((category) => parentId);

    // const childCategories = parentCategoryExist
    //   ? data.filter((category) => category.parent_category_id === parentId)
    //   : data;

    // if (childCategories.length === 0) {
    //   return [];
    // }

    const childCategories = data.filter(
      (category) => category.parent_category_id === parentId
    );

    if (childCategories.length === 0) {
      return [];
    }

    return childCategories.map((category) => (
      <div
        key={category.category_id}
        className={`${isChild ? styles.childCategory : styles.parentCategory} ${
          searchCategory &&
          removeAccents(category.category_name.toLowerCase()).includes(
            removeAccents(searchCategory.toLowerCase())
          )
            ? styles.highlighted
            : ""
        }`}
      >
        <div className={styles.categoryRow}>
          <div className={styles.checkbox}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedCategories.includes(category.category_id)}
                  onChange={() => handleCheckboxChange(category.category_id)}
                />
              }
              label=""
            />
          </div>
          <div className={styles.image}>
            <Image
              src={
                category.category_image_url
                  ? "/" + category.category_image_url
                  : placeholder
              }
              width={40}
              height={40}
              alt={category.category_name}
              quality={50}
            />
          </div>
          <div className={styles.name}>{category.category_name}</div>
          <div
            className={styles.description}
            title={category.category_description}
          >
            {category.category_description
              ? category.category_description
              : "-"}
          </div>
          <div className={styles.actions}>
            <Stack direction="row" spacing={1}>
              <IconButton
                aria-label="edit"
                disabled={selectedCategories.length > 1}
                onClick={() => handleEdit(category.category_id)}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                aria-label="delete"
                color="error"
                disabled={selectedCategories.length > 1}
                onClick={() => {
                  if (
                    !selectedCategories?.find(
                      (item) => item === category.category_id
                    )
                  )
                    handleCheckboxChange(category.category_id);
                  setIsConfirmedDialogOpen(true);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Stack>
          </div>
        </div>
        {renderCategories(category.category_id, true)}
      </div>
    ));
  };

  return (
    <div>
      {selectedCategories?.length > 1 && (
        <Button
          onClick={() => setIsConfirmedDialogOpen(true)}
          // onClick={() => handleDeleteMass(selectedCategories)}
          className={styles.deleteAll}
          variant="outlined"
          color="error"
          startIcon={<DeleteIcon />}
        >
          Delete Selected Categories
        </Button>
      )}
      <div className={styles.tableHead}>
        <Checkbox
          className={styles.headCheckbox}
          checked={isTableHeadChecked}
          onChange={handleTableHeadCheckboxChange}
        />
        <div className={styles.headImage}>Image</div>
        <div>Name</div>
        <div className={styles.headDescr}>Description</div>
        <div className={styles.actionsHead}>Actions</div>
      </div>
      <Divider />
      {isLoading ? <Skeleton height={300} /> : renderCategories(null)}

      {/* //TODO pagination */}

      {/* {isLoading ? (
        <Skeleton height={300} />
      ) : (
        data.map((category) => (
          <div
            key={category.category_id}
            className={`${
              category.parent_category_id
                ? styles.childCategory
                : styles.parentCategory
            } ${
              searchCategory &&
              removeAccents(category.category_name.toLowerCase()).includes(
                removeAccents(searchCategory.toLowerCase())
              )
                ? styles.highlighted
                : ""
            }`}
          >
            <div className={styles.categoryRow}>
              <div className={styles.checkbox}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedCategories.includes(
                        category.category_id
                      )}
                      onChange={() =>
                        handleCheckboxChange(category.category_id)
                      }
                    />
                  }
                  label=""
                />
              </div>
              <div className={styles.image}>
                <Image
                  src={
                    category.category_image_url
                      ? "/" + category.category_image_url
                      : placeholder
                  }
                  width={40}
                  height={40}
                  alt={category.category_name}
                  quality={50}
                />
              </div>
              <div className={styles.name}>{category.category_name}</div>
              <div
                className={styles.description}
                title={category.category_description}
              >
                {category.category_description
                  ? category.category_description
                  : "-"}
              </div>
              <div className={styles.actions}>
                <Stack direction="row" spacing={1}>
                  <IconButton
                    aria-label="edit"
                    disabled={selectedCategories.length > 1}
                    onClick={() => handleEdit(category.category_id)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    color="error"
                    disabled={selectedCategories.length > 1}
                    onClick={() => {
                      if (
                        !selectedCategories?.find(
                          (item) => item === category.category_id
                        )
                      )
                        handleCheckboxChange(category.category_id);
                      setIsConfirmedDialogOpen(true);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Stack>
              </div>
            </div>
          </div>
        ))
      )} */}
      <ModalDialog
        title={`Are you sure you want to delete "${selectedCategories?.map(
          (categoryId) =>
            data?.find((item) => item.category_id === categoryId)
              ?.category_name || null
        )}"`}
        open={isConfirmedDialogOpen}
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
              selectedCategories?.length > 1
                ? handleDeleteMass(selectedCategories)
                : handleDelete(selectedCategories[0]);
              setIsConfirmedDialogOpen(false);
            }}
          >
            Yes
          </Button>
        </Stack>
      </ModalDialog>
    </div>
  );
}

export default memo(CategoriesTable);
