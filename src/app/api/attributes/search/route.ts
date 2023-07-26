import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const searchValue = searchParams.get("search");

  const product_attributes = await query({
    query: `SELECT id, name FROM attributes WHERE name LIKE ?`,
    values: [`%${searchValue}%`],
  });

  return NextResponse.json(product_attributes);
};
