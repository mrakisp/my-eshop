import { IProduct, IProductVariations } from "@/types/productTypes";

export const ProductModel: IProduct = {
  name: "",
  description: "",
  short_description: "",
  product_type: "simple",
  price: null,
  sale_price: null,
  id: null,
  sku: "",
  quantity: null,
  in_stock: 0,
  status: "published",
  image: "",
  gallery_images: "",
  width: null,
  height: null,
  length: null,
  video: "",
  created_at: new Date(),
  updated_at: new Date(),
  category_ids: "",
  attributes_ids: "",
  grouped_id: "",
};

export const ProductVariationsModel: IProductVariations[] = [
  //   {
  //   id: null,
  //   prod_id: null,
  //   atr_id: null,
  //   sku: "",
  //   atr_values_id: null,
  //   price: null,
  //   sale_price: null,
  //   stock: null,
  //   created_at: new Date(),
  //   updated_at: new Date(),
  // }
];
