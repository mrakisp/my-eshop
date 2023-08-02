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

  const products = await query({
    query: "SELECT * FROM products LIMIT ?, ?",
    values: [offset, pageSize],
  });

  return NextResponse.json({ products });
};

export const POST = async (req: Request, res: Response) => {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");

  const requestBody = await req.json();

  const name = requestBody.model.name;
  const product_type = requestBody.model.product_type
    ? requestBody.model.product_type
    : "simple";
  const price = requestBody.model.price
    ? parseFloat(requestBody.model.price)
    : 0;
  const sale_price = requestBody.model.sale_price
    ? parseFloat(requestBody.model.sale_price)
    : null;
  const description = requestBody.model.description
    ? requestBody.model.description
    : null;
  const short_description = requestBody.model.short_description
    ? requestBody.model.short_description
    : null;
  const sku = requestBody.model.sku ? requestBody.model.sku : null;
  const quantity = requestBody.model.quantity
    ? parseInt(requestBody.model.quantity)
    : null;
  const in_stock = requestBody.model.quantity
    ? parseInt(requestBody.model.quantity) > 0
      ? 1
      : 0
    : 1;
  const status = requestBody.model.status
    ? requestBody.model.status
    : "published";
  const image = requestBody.model.image ? requestBody.model.image : null;
  const gallery_images = requestBody.model.gallery_images
    ? requestBody.model.gallery_images
    : null;
  const width = requestBody.model.width
    ? parseFloat(requestBody.model.width)
    : null;
  const height = requestBody.model.height
    ? parseFloat(requestBody.model.height)
    : null;
  const length = requestBody.model.length
    ? parseFloat(requestBody.model.length)
    : null;
  const video = requestBody.model.video ? requestBody.model.video : null;
  const updated_at = new Date();
  const created_at = new Date();
  const category_ids = requestBody.model.category_ids
    ? requestBody.model.category_ids
    : null;
  // const c_slug = categoryName
  //   ? typesGreekUtils
  //       .toGreeklish(categoryName?.replace(" ", "-"))
  //       ?.toLowerCase()
  //   : null;

  let message = { completed: false, error: "" };
  let dbQuery = "";
  let Qvalues: any[] = [];

  if (type === "update") {
    // dbQuery = `UPDATE product_categories SET category_name = ?, category_description = ?, parent_category_id = ?, category_show_type = ? WHERE category_id = ?`;
    // Qvalues = [
    //   categoryName,
    //   categoryDescr,
    //   parentCategory,
    //   showType,
    //   categoryId,
    // ];
  } else if (type === "delete") {
    // const childRows = (await query({
    //   query:
    //     "SELECT category_id FROM product_categories WHERE parent_category_id = ?",
    //   values: [categoryId],
    // })) as RowDataPacket[];
    // if (childRows && childRows.length > 0) {
    //   // Update the parent_category_id of child categories to null
    //   await query({
    //     query:
    //       "UPDATE product_categories SET parent_category_id = NULL WHERE parent_category_id = ?",
    //     values: [categoryId],
    //   });
    // }
    // dbQuery = "DELETE FROM product_categories WHERE category_id = ?";
    // Qvalues = [categoryId];
  } else {
    dbQuery = `INSERT INTO products (name, product_type, price, sale_price, description, short_description, sku, quantity, in_stock, status, image,
       gallery_images, width, height, length, video, updated_at ,created_at, category_ids) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    Qvalues = [
      name,
      product_type,
      price,
      sale_price,
      description,
      short_description,
      sku,
      quantity,
      in_stock,
      status,
      image,
      gallery_images,
      width,
      height,
      length,
      video,
      updated_at,
      created_at,
      category_ids,
    ];
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
