import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const id = params.id;

  const category = await query({
    query: "SELECT * FROM attributes WHERE id= ?",
    values: [id[0]],
  });

  return NextResponse.json(category);
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
