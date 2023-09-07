import { NextResponse } from "next/server";
import { RowDataPacket } from "mysql2";
import { query } from "@/lib/db";

// export const GET = async (
//   req: Request,
//   { params }: { params: { id: string } }
// ) => {
//   const id = params.id;

//   const product = (await query({
//     query: "SELECT * FROM products WHERE id = ?",
//     values: [id[0]],
//   })) as RowDataPacket[];

//   return NextResponse.json(product);
// };

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const id = params.id;

  const product = (await query({
    query: `SELECT pv.*, av.name AS attribute_name
    FROM product_variations pv
    LEFT JOIN attribute_values av ON pv.atr_values_id = av.id
    WHERE pv.prod_id = ?`,
    //"SELECT * FROM product_variations WHERE prod_id = ?",
    values: [id[0]],
  })) as RowDataPacket[];

  return NextResponse.json(product);
};

export const POST = async (req: Request, res: Response) => {
  console.log("a");
};
