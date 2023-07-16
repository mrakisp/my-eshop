import { NextResponse } from "next/server";
import { RowDataPacket } from "mysql2";
import { query } from "@/lib/db";
// import { redirect } from 'next/navigation'
import bcrypt from "bcrypt";

export const POST = async (req: Request, res: Response) => {
  const requestBody = await req.json();
  const email = requestBody.email;
  const hashedPassword = await bcrypt.hash(requestBody.password, 10);
  const dbQuery = `INSERT INTO users_new (u_email, u_password)
  SELECT ?, ?
  FROM DUAL
  WHERE NOT EXISTS (SELECT u_email FROM users_new WHERE u_email = ?)`;

  const user = (await query({
    query: dbQuery,
    values: [email, hashedPassword, email],
  })) as RowDataPacket[];

  // redirect('https://nextjs.org/')
  return NextResponse.json({ user });
};
