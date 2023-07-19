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

  const product_categories = await query({
    query: "SELECT * FROM product_categories  LIMIT ?, ?",
    values: [offset, pageSize],
  });

  return NextResponse.json(product_categories);
};

export const POST = async (req: Request, res: Response) => {
  // const requestBody = await req.json();
  // const email = requestBody.email;
  // const dbQuery = `INSERT INTO users (email, password, role_id)
  // SELECT ?, ?, ?
  // FROM DUAL
  // WHERE NOT EXISTS (SELECT email FROM users WHERE email = ?)`;
  // let registeredUser = false;
  // await query({
  //   query: dbQuery,
  //   values: [email, hashedPassword, 2, email],
  // })
  //   .then((response: any) => {
  //     if (response.affectedRows === 1) registeredUser = true;
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });
  // // redirect('https://nextjs.org/')
  // return NextResponse.json(registeredUser);
};
