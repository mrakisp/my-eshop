import { NextResponse } from "next/server";
import { query } from "@/lib/db";

// export const GET = async (req: Request) => {
//   const { searchParams } = new URL(req.url);
//   const pageNumber = searchParams.get("pageNumber")
//     ? parseInt(searchParams.get("pageNumber")!)
//     : 1;
//   const pageSize = searchParams.get("pageSize")
//     ? parseInt(searchParams.get("pageSize")!)
//     : 50;

//   const offset = (pageNumber - 1) * pageSize;

//   const products = await query({
//     query: "SELECT * FROM product_variations WHERE prod_id = ?",
//     values: [id, pageSize],
//   });

//   return NextResponse.json({ products });
// };

export const POST = async (req: Request, res: Response) => {
  const requestBody = await req.json();

  const prod_id = requestBody.id;

  const messages = await Promise.all(
    requestBody.model.map(async (variation: any) => {
      const { atr_id, atr_values_id, price, sale_price, sku, stock } =
        variation;

      const updated_at = new Date();
      const created_at = new Date();

      const dbQuery = `INSERT INTO product_variations (prod_id, atr_id, atr_values_id, price, sale_price, sku, stock, created_at, updated_at) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

      const Qvalues = [
        prod_id,
        atr_id,
        atr_values_id,
        parseFloat(price) || null,
        parseFloat(sale_price) || null,
        sku || null,
        parseInt(stock) || 0,
        created_at,
        updated_at,
      ];

      try {
        const response: any = await query({
          query: dbQuery,
          values: Qvalues,
        });

        if (response.affectedRows === 1) {
          return { completed: true, error: "" };
        } else {
          return { completed: false, error: response.error };
        }
      } catch (err) {
        console.log(err);
        return { completed: false, error: err };
      }
    })
  );

  // Check if all insertions were successful
  const allCompleted = messages.every((message) => message.completed);

  return NextResponse.json({ completed: allCompleted, messages });
};

// export const POST = async (req: Request, res: Response) => {
//   const requestBody = await req.json();

//   const prod_id = requestBody.id;
//   const atr_id = requestBody.model.atr_id;
//   const atr_values_id = requestBody.model.atr_values_id;
//   const price = requestBody.model.price
//     ? parseFloat(requestBody.model.price)
//     : null;
//   const sale_price = requestBody.model.sale_price
//     ? parseFloat(requestBody.model.sale_price)
//     : null;
//   const sku = requestBody.model.sku ? requestBody.model.sku : null;
//   const stock = requestBody.model.stock
//     ? parseInt(requestBody.model.stock)
//     : null;
//   const updated_at = new Date();
//   const created_at = new Date();

//   let message = { completed: false, error: "" };
//   let dbQuery = "";
//   let Qvalues: any[] = [];

//   dbQuery = `INSERT INTO product_variations (prod_id, atr_id, atr_values_id, price, sale_price, sku, stock, created_at, updated_at)
//        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
//   Qvalues = [
//     prod_id,
//     atr_id,
//     atr_values_id,
//     price,
//     sale_price,
//     sku,
//     stock,
//     created_at,
//     updated_at,
//   ];

//   await query({
//     query: dbQuery,
//     values: Qvalues,
//   })
//     .then((response: any) => {
//       if (response.affectedRows === 1) {
//         message = { completed: true, error: "" };
//       } else {
//         message = { completed: false, error: response.error };
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//       message = { completed: false, error: err };
//     });

//   return NextResponse.json(message);
// };
