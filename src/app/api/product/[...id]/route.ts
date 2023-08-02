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
