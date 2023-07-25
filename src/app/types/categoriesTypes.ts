export interface ICategories {
  category_id: number;
  parent_category_id: number;
  category_name: string;
  category_image_url: string;
  category_description: string;
  category_show_type: number;
  created_at: Date;
  updated_at: Date;
}
