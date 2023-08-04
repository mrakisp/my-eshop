import { NextResponse } from "next/server";
import { query } from "@/lib/db";

// export const GET = async (req: Request) => {

//   const products = await query({
//     query: "SELECT * FROM products LIMIT ?, ?",
//     values: [],
//   });

//   return NextResponse.json({ products });
// };

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const id = params.id;

  const product = await query({
    query: "SELECT * FROM products WHERE id= ?",
    values: [id[0]],
  });

  return NextResponse.json(product);
};

export const POST = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");

  const id = params.id;

  let dbQuery;
  let Qvalues;
  if (type && type === "delete") {
    dbQuery = `DELETE FROM products WHERE id= ?`;
    Qvalues = [id[0]];
  } else {
    dbQuery = `SELECT * FROM products WHERE id= ?`;
    Qvalues = [id[0]];
  }

  const product = await query({
    query: dbQuery,
    values: Qvalues,
  });

  return NextResponse.json(product);
};
