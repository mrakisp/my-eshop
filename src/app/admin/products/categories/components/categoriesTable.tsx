"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Checkbox,
  FormControlLabel,
  Divider,
  Skeleton,
  IconButton,
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { ICategories } from "@/types/categoriesTypes";
import styles from "./categoriesTable.module.scss";

import placeholder from "@/assets/placeholder.png";

interface CategoryProps {
  data: ICategories[];
  isLoading: boolean;
}

export default function CategoriesTable({ data, isLoading }: CategoryProps) {
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [isTableHeadChecked, setIsTableHeadChecked] = useState(false);

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

  const renderCategories = (
    parentId: number | null,
    isChild: boolean = false
  ): JSX.Element[] => {
    const childCategories = data.filter(
      (category) => category.parent_category_id === parentId
    );

    if (childCategories.length === 0) {
      return [];
    }

    return childCategories.map((category) => (
      <div
        key={category.category_id}
        className={isChild ? styles.childCategory : styles.parentCategory}
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
                  ? category.category_image_url
                  : placeholder
              }
              // fill={true}
              width={40}
              height={40}
              alt="Picture of the author"
              quality={50}
              // placeholder="blur"
            />
          </div>
          <div className={styles.name}>{category.category_name}</div>
          <div className={styles.description}>
            {category.category_description
              ? category.category_description
              : "-"}
          </div>
          <div className={styles.actions}>
            <Stack direction="row" spacing={1}>
              <IconButton aria-label="edit">
                <EditIcon />
              </IconButton>
              <IconButton aria-label="delete">
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
    </div>
  );
}
