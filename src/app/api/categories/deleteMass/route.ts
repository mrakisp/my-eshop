import { NextResponse } from "next/server";
import { RowDataPacket } from "mysql2";
import { query } from "@/lib/db";

export const POST = async (req: Request, res: Response) => {
  const requestBody = await req.json();
  const categoryIds = requestBody.categoryIds;
  console.log(categoryIds);
  let message = { completed: false, error: "" };
  let dbQuery;
  let Qvalues;
  for (const categoryId of categoryIds) {
    const childRows = (await query({
      query:
        "SELECT category_id FROM product_categories WHERE parent_category_id = ?",
      values: [categoryId],
    })) as RowDataPacket[];

    if (childRows && childRows.length > 0) {
      await query({
        query:
          "UPDATE product_categories SET parent_category_id = NULL WHERE parent_category_id = ?",
        values: [categoryId],
      });
    }

    dbQuery = "DELETE FROM product_categories WHERE category_id = ?";
    Qvalues = [categoryId];

    await query({
      query: dbQuery,
      values: Qvalues,
    })
      .then((response: any) => {
        if (response.affectedRows === 1) {
          message = { completed: true, error: "" };
        } else {
          message = { completed: false, error: response.error };
        }
      })
      .catch((err) => {
        console.log(err);
        message = { completed: false, error: err };
      });
  }

  return NextResponse.json(message);
};
