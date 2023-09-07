import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const searchValue = searchParams.get("search");

  const product = await query({
    query: "SELECT * FROM products WHERE name LIKE ? OR sku LIKE ?",
    values: [`%${searchValue}%`, `%${searchValue}%`],
  });

  return NextResponse.json(product);
};
