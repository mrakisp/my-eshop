import { IProduct } from "@/types/productTypes";

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
};
