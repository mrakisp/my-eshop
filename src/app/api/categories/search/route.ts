import { NextResponse } from "next/server";
import { RowDataPacket } from "mysql2";
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
        category_name
      FROM 
        product_categories
      WHERE 
        category_name LIKE ?
      UNION ALL
      SELECT 
        pc.category_id,
        pc.parent_category_id,
        pc.category_name
      FROM 
        product_categories pc
      JOIN 
        category_tree ct ON pc.category_id = ct.parent_category_id
    )
    SELECT 
      category_id,
      parent_category_id,
      category_name
    FROM 
      category_tree
  `,
    values: [`%${searchValue}%`],
  });

  return NextResponse.json(product_categories);
};
