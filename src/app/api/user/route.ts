import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export const GET = async (req: Request, res: Response) => {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  const password = searchParams.get("password");
  let user;

  if (password && email) {
    user = await query({
      query: "SELECT * FROM users_new WHERE u_email = ? AND u_password = ?",
      values: [email, password],
    });
  }

  return NextResponse.json({ user });
};

export const POST = async (req: Request, res: Response) => {
  console.log("a");
};
