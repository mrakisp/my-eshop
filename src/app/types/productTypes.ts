export interface IProduct {
  name: string;
  description: string;
  short_description: string;
  product_type: "simple" | "variable";
  price: number | null;
  sale_price?: number | null;
  id?: number | null;
  sku?: string;
  quantity?: number | null;
  in_stock?: 0 | 1;
  status?: "draft" | "published";
  image?: string;
  gallery_images?: string;
  width?: number | null;
  height?: number | null;
  length?: number | null;
  video?: string;
  created_at?: Date;
  updated_at?: Date;
  category_ids?: string;
}
