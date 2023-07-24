import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const searchValue = searchParams.get("search");

  const product_categories = await query({
    query: `
    WITH RECURSIVE category_tree AS (
      SELECT
        category_id,
        parent_category_id,
        category_name,
        category_description,
        category_image_url
      FROM
        product_categories
      WHERE
        category_name LIKE ?
      UNION ALL
      SELECT
        pc.category_id,
        pc.parent_category_id,
        pc.category_name,
        pc.category_description,
        pc.category_image_url
      FROM
        product_categories pc
      JOIN
        category_tree ct ON pc.category_id = ct.parent_category_id
    )
    SELECT
      category_id,
      parent_category_id,
      category_name,
      category_description,
      category_image_url
    FROM
      category_tree
      GROUP BY category_id
  `,
    values: [`%${searchValue}%`],
  });

  return NextResponse.json(product_categories);
};
