import { NextResponse } from "next/server";
import { RowDataPacket } from "mysql2";
import { query } from "@/lib/db";
import typesGreekUtils from "greek-utils";

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
    query: `
      SELECT *
      FROM product_categories ORDER BY parent_category_id
      LIMIT ?, ? ;
    `,
    // TODO pagination
    // query: `
    //   SELECT *, (SELECT COUNT(*) FROM product_categories) AS totalCategoriesCount
    //   FROM product_categories ORDER BY parent_category_id
    //   LIMIT ?, ? ;
    // `,
    // query: `SELECT *, (SELECT COUNT(*) FROM product_categories) AS totalCategoriesCount
    // FROM product_categories
    // ORDER BY
    //   CASE
    //     WHEN parent_category_id IS NOT NULL THEN parent_category_id
    //     ELSE category_id
    //   END,
    //   parent_category_id IS NOT NULL LIMIT ?, ?;
    // `,
    // query: `WITH RECURSIVE category_tree AS (
    //   SELECT category_id, parent_category_id, category_name, 0 AS level
    //   FROM product_categories
    //   WHERE parent_category_id IS NULL

    //   UNION ALL

    //   SELECT pc.category_id, pc.parent_category_id, pc.category_name, ct.level + 1 AS level
    //   FROM product_categories pc
    //   INNER JOIN category_tree ct ON pc.parent_category_id = ct.category_id
    // )
    // SELECT *, (SELECT COUNT(*) FROM product_categories) AS totalCategoriesCount
    // FROM category_tree
    // ORDER BY CASE WHEN parent_category_id IS NOT NULL THEN parent_category_id ELSE category_id END, parent_category_id IS NOT NULL LIMIT ?, ?;
    // `,
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
  const showType = requestBody.showType ? parseInt(requestBody.showType) : 0;

  const c_slug = categoryName
    ? typesGreekUtils
        .toGreeklish(categoryName?.replace(" ", "-"))
        ?.toLowerCase()
    : null;

  let message = { completed: false, error: "" };
  let dbQuery;
  let Qvalues;

  if (type === "update") {
    //it will affect SEO if change name - not desired //TODO
    // dbQuery = `UPDATE product_categories SET category_name = ?, category_description = ?, parent_category_id = ?, category_show_type = ?, category_slug = ? WHERE category_id = ?`;
    // Qvalues = [
    //   categoryName,
    //   categoryDescr,
    //   parentCategory,
    //   showType,
    //   c_slug,
    //   categoryId,
    // ];
    dbQuery = `UPDATE product_categories SET category_name = ?, category_description = ?, parent_category_id = ?, category_show_type = ? WHERE category_id = ?`;
    Qvalues = [
      categoryName,
      categoryDescr,
      parentCategory,
      showType,
      categoryId,
    ];
  } else if (type === "delete") {
    const childRows = (await query({
      query:
        "SELECT category_id FROM product_categories WHERE parent_category_id = ?",
      values: [categoryId],
    })) as RowDataPacket[];

    if (childRows && childRows.length > 0) {
      // Update the parent_category_id of child categories to null
      await query({
        query:
          "UPDATE product_categories SET parent_category_id = NULL WHERE parent_category_id = ?",
        values: [categoryId],
      });
    }
    dbQuery = "DELETE FROM product_categories WHERE category_id = ?";
    Qvalues = [categoryId];
  } else {
    dbQuery = `INSERT INTO product_categories (category_name, category_description, parent_category_id, category_slug, category_show_type) VALUES (?, ?, ?, ?, ?)`;
    Qvalues = [categoryName, categoryDescr, parentCategory, c_slug, showType];
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
