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

  const products = (await query({
    query: "SELECT * FROM products LIMIT ?, ?",
    values: [offset, pageSize],
  })) as RowDataPacket[];

  return NextResponse.json({ products });
};

export const POST = async (req: Request, res: Response) => {
  console.log("a");
};
