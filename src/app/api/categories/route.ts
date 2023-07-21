import { NextResponse } from "next/server";
import { RowDataPacket } from "mysql2";
import { query } from "@/lib/db";

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const pageNumber = searchParams.get("pageNumber")
    ? parseInt(searchParams.get("pageNumber")!)
    : 1;
  const pageSize = searchParams.get("pageSize")
    ? parseInt(searchParams.get("pageSize")!)
    : 50;

  const offset = (pageNumber - 1) * pageSize;

  const product_categories = await query({
    query: "SELECT * FROM product_categories  LIMIT ?, ?",
    values: [offset, pageSize],
  });

  return NextResponse.json(product_categories);
};

export const POST = async (req: Request, res: Response) => {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");

  const requestBody = await req.json();
  const categoryName = requestBody.categoryName;
  const categoryDescr = requestBody.categoryDescr
    ? requestBody.categoryDescr
    : null;
  const parentCategory = requestBody.parentCategory
    ? requestBody.parentCategory
    : null;
  const categoryId = requestBody.categoryId;

  let message = { completed: false, error: "" };
  let dbQuery;
  let Qvalues;

  if (type === "update") {
    dbQuery = `UPDATE product_categories SET category_name = ?, category_description = ?, parent_category_id = ? WHERE category_id = ?`;
    Qvalues = [categoryName, categoryDescr, parentCategory, categoryId];
  } else if (type === "delete") {
    dbQuery = `DELETE FROM product_categories WHERE category_id = ?`; //if category has child categories it will be deleted
    Qvalues = [categoryId];
  } else {
    dbQuery = `INSERT INTO product_categories (category_name, category_description, parent_category_id) VALUES (?, ?, ?)`;
    Qvalues = [categoryName, categoryDescr, parentCategory];
  }

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

  return NextResponse.json(message);
};
