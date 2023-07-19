import { NextResponse } from "next/server";
import { RowDataPacket } from "mysql2";
import { query } from "@/lib/db";
// import { redirect } from 'next/navigation'
import bcrypt from "bcrypt";

export const POST = async (req: Request, res: Response) => {
  const requestBody = await req.json();
  const email = requestBody.email;
  const hashedPassword = await bcrypt.hash(requestBody.password, 10);
  const dbQuery = `INSERT INTO users (email, password, role_id)
  SELECT ?, ?, ?
  FROM DUAL
  WHERE NOT EXISTS (SELECT email FROM users WHERE email = ?)`;

  let registeredUser = false;
  await query({
    query: dbQuery,
    values: [email, hashedPassword, 2, email],
  })
    .then((response: any) => {
      if (response.affectedRows === 1) registeredUser = true;
    })
    .catch((error) => {
      console.error(error);
    });

  // redirect('https://nextjs.org/')
  return NextResponse.json(registeredUser);
};
