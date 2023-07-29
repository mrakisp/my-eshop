export interface IProduct {
  name: string;
  description: string;
  shortDescr: string;
  product_type?: string;
  price?: number;
  sale_price?: number;
  id?: number;
  sku?: string;
  quantity?: number;
  in_stock?: number;
  status?: "draft" | "published";
  image?: string;
  gallery_images?: string;
  width?: number;
  height?: number;
  length?: number;
  video?: string;
  created_at?: Date;
  updated_at?: Date;
}
