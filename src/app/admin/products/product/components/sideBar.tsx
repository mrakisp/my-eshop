"use client";
import {
  useState,
  useEffect,
  useCallback,
  SetStateAction,
  Dispatch,
  useMemo,
} from "react";
import {
  Switch,
  Stack,
  Typography,
  Skeleton,
  FormControlLabel,
  Checkbox,
  TextField,
} from "@mui/material";
import SectionTitle from "@/admin/components/sectionTitle/sectionTitle";
import Search from "@/admin/components/search/search";
import styles from "./sideBar.module.scss";
import { ICategories } from "@/types/categoriesTypes";
import { getCategories, searchCategories } from "@/services/categories";
import { IProduct } from "@/types/productTypes";

interface SideBarProps {
  productModel: IProduct;
  setProductModel: Dispatch<SetStateAction<IProduct>>;
}

export default function SideBar({
  productModel,
  setProductModel,
}: SideBarProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [categories, setCategories] = useState<ICategories[]>([]);
  const [pagination, setPagination] = useState({ page: 0, perPage: 100 });
  const [isPublished, setIsPublished] = useState(
    productModel.status === "published" ? true : false
  );

  const fetchCategories = useCallback(() => {
    setIsLoading(true);
    getCategories(pagination).then((response: ICategories[]) => {
      setCategories(response);
      setIsLoading(false);
    });
  }, [pagination]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    if (!productModel.category_ids) {
      setSelectedCategories([]);
    } else {
      setSelectedCategories(productModel.category_ids.split(",").map(Number));
    }
  }, [productModel.category_ids]);

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newStatus = event.target.checked ? "published" : "draft";
    setProductModel((prevModel) => ({ ...prevModel, status: newStatus }));
    setIsPublished(event.target.checked);
  };

  const handleSelectCategoriesChange = (categoryId: number) => {
    const newSelectedCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter((id) => id !== categoryId)
      : [...selectedCategories, categoryId];

    setProductModel((prevModel) => ({
      ...prevModel,
      category_ids: newSelectedCategories.join(","),
    }));
    setSelectedCategories(newSelectedCategories);
  };

  const handleSearch = useCallback(
    (searchValue: string) => {
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

  const renderCategories = useMemo(() => {
    const renderCategoriesRecursive = (
      parentId: number | null,
      isChild: boolean = false
    ): JSX.Element[] => {
      const childCategories = categories.filter(
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
                    onChange={() =>
                      handleSelectCategoriesChange(category.category_id)
                    }
                  />
                }
                label=""
              />
            </div>
            <div className={styles.name}>{category.category_name}</div>
          </div>
          {renderCategoriesRecursive(category.category_id, true)}
        </div>
      ));
    };

    return renderCategoriesRecursive(null);
  }, [categories, selectedCategories]);

  return (
    <div className={styles.sidebarContainer}>
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography>Draft</Typography>
        <Switch checked={isPublished} onChange={handleStatusChange} />
        <Typography>Published</Typography>
      </Stack>
      <div className={styles.boxContainer}>
        <SectionTitle
          title="Categories"
          rightArea={
            <Search
              handleSearch={handleSearch}
              width={250}
              isStandAlone={false}
            />
          }
        />
        {isLoading ? (
          <Skeleton height={300} />
        ) : (
          <div className={styles.categoriesList}>{renderCategories}</div>
        )}
      </div>
      <div className={styles.boxContainer}>
        <SectionTitle title="Image" />
      </div>
      <div className={styles.boxContainer}>
        <SectionTitle title="Gallery" />
      </div>
      <div className={styles.boxContainer}>
        <SectionTitle title="Video" />
        <TextField
          label=""
          fullWidth
          placeholder="Add Youtube link"
          variant="outlined"
          value={productModel.video ? productModel.video : ""}
          onChange={(e) =>
            setProductModel({ ...productModel, video: e.target.value })
          }
        />
      </div>
    </div>
  );
}

// "use client";
// import {
//   useState,
//   useEffect,
//   useCallback,
//   SetStateAction,
//   Dispatch,
// } from "react";
// import {
//   Switch,
//   Stack,
//   Typography,
//   Skeleton,
//   FormControlLabel,
//   Checkbox,
//   TextField,
// } from "@mui/material";

// import SectionTitle from "@/admin/components/sectionTitle/sectionTitle";
// import Search from "@/admin/components/search/search";

// import styles from "./sideBar.module.scss";

// import { ICategories } from "@/types/categoriesTypes";
// import { getCategories, searchCategories } from "@/services/categories";

// import { IProduct } from "@/types/productTypes";

// interface SideBarProps {
//   productModel: IProduct;
//   setProductModel: Dispatch<SetStateAction<IProduct>>;
// }
// export default function SideBar({
//   productModel,
//   setProductModel,
// }: SideBarProps) {
//   const [isLoading, setIsLoading] = useState(false);
//   const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
//   const [categories, setCategories] = useState<ICategories[]>([]);
//   const [pagination, setPagination] = useState({ page: 0, perPage: 100 });

//   const [isPublished, setIsPublished] = useState(
//     productModel.status === "published" ? true : false
//   );

//   const fetchCategories = useCallback(() => {
//     setIsLoading(true);
//     getCategories(pagination).then((response: ICategories[]) => {
//       setCategories(response);
//       setIsLoading(false);
//     });
//   }, [pagination]);

//   const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (!event.target.checked) {
//       setProductModel({
//         ...productModel,
//         status: "draft",
//       });
//     } else {
//       setProductModel({
//         ...productModel,
//         status: "published",
//       });
//     }
//     setIsPublished(event.target.checked);
//   };

//   const handleSelectCategoriesChange = (categoryId: number) => {
//     const selectedIndex = selectedCategories.indexOf(categoryId);
//     let newSelectedCategories: number[] = [];

//     if (selectedIndex === -1) {
//       newSelectedCategories = [...selectedCategories, categoryId];
//     } else {
//       newSelectedCategories = selectedCategories.filter(
//         (id) => id !== categoryId
//       );
//     }
//     setProductModel({
//       ...productModel,
//       category_ids: newSelectedCategories.toString(),
//     });

//     setSelectedCategories(newSelectedCategories);
//   };

//   const handleSearch = useCallback(
//     (searchValue: string) => {
//       if (searchValue) {
//         setIsLoading(true);
//         searchCategories(searchValue).then((response: ICategories[]) => {
//           setCategories(response);
//           setIsLoading(false);
//         });
//       } else {
//         fetchCategories();
//       }
//     },
//     [fetchCategories]
//   );

//   const renderCategories = (
//     parentId: number | null,
//     isChild: boolean = false
//   ): JSX.Element[] => {
//     const childCategories = categories.filter(
//       (category) => category.parent_category_id === parentId
//     );

//     if (childCategories.length === 0) {
//       return [];
//     }

//     return childCategories.map((category) => (
//       <div
//         key={category.category_id}
//         className={isChild ? styles.childCategory : styles.parentCategory}
//       >
//         <div className={styles.categoryRow}>
//           <div className={styles.checkbox}>
//             <FormControlLabel
//               control={
//                 <Checkbox
//                   checked={selectedCategories.includes(category.category_id)}
//                   onChange={() =>
//                     handleSelectCategoriesChange(category.category_id)
//                   }
//                 />
//               }
//               label=""
//             />
//           </div>
//           <div className={styles.name}>{category.category_name}</div>
//         </div>
//         {renderCategories(category.category_id, true)}
//       </div>
//     ));
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, [pagination]);

//   useEffect(() => {
//     if (!productModel.category_ids) {
//       setSelectedCategories([]);
//     } else {
//       setSelectedCategories(productModel.category_ids.split(",").map(Number));
//     }
//   }, [productModel.category_ids]);

//   return (
//     <div className={styles.sidebarContainer}>
//       <Stack direction="row" spacing={1} alignItems="center">
//         <Typography>Draft</Typography>
//         <Switch checked={isPublished} onChange={handleStatusChange} />
//         <Typography>Published</Typography>
//       </Stack>
//       <div className={styles.boxContainer}>
//         <SectionTitle
//           title="Categories"
//           rightArea={
//             <Search
//               handleSearch={handleSearch}
//               width={250}
//               isStandAlone={false}
//             />
//           }
//         />
//         {isLoading ? (
//           <Skeleton height={300} />
//         ) : (
//           <div className={styles.categoriesList}>{renderCategories(null)}</div>
//         )}
//       </div>
//       <div className={styles.boxContainer}>
//         <SectionTitle title="Image" />
//       </div>
//       <div className={styles.boxContainer}>
//         <SectionTitle title="Gallery" />
//       </div>
//       <div className={styles.boxContainer}>
//         <SectionTitle title="Video" />
//         <TextField
//           label=""
//           fullWidth
//           placeholder="Add Youtube link"
//           variant="outlined"
//           value={productModel.video ? productModel.video : ""}
//           onChange={(e) =>
//             setProductModel({
//               ...productModel,
//               video: e.target.value,
//             })
//           }
//         />
//       </div>
//     </div>
//   );
// }
