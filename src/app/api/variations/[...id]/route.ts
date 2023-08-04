import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const id = params.id;

  const variations = await query({
    query: "SELECT * FROM product_variations WHERE prod_id = ?",
    values: [id[0]],
  });

  return NextResponse.json(variations);
};
