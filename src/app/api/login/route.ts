import { NextResponse } from "next/server";
import { RowDataPacket } from "mysql2";
import { query } from "@/lib/db";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";

const setLogInCookie = (role: number) => {
  const date = new Date();
  const tomorrow = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    23,
    59,
    59
  );

  cookies().set({
    name: "logged_in",
    value:
      role === 1
        ? `${process.env.ADMIN_TOKEN}`
        : `${process.env.CUSTOMER_TOKEN}`,
    expires: tomorrow,
    path: "/",
    httpOnly: true,
  });
};

const removeLogInCookie = () => {
  cookies().set({
    name: "logged_in",
    value: "",
    expires: new Date("2010-10-05"),
    path: "/",
  });
};

export const POST = async (req: Request, res: Response) => {
  const requestBody = await req.json();
  const email = requestBody.email;
  const password = requestBody.password;
  let validUser: any = [];

  if (password && email) {
    const user = (await query({
      query: "SELECT * FROM users_new WHERE u_email = ? ",
      values: [email],
    })) as RowDataPacket[];

    if (user && user.length > 0) {
      const isPasswordValid = await bcrypt.compare(
        password,
        user[0].u_password
      );
      if (isPasswordValid) {
        validUser = user;
        setLogInCookie(user[0].u_ut_id);
      } else {
        removeLogInCookie();
      }
    } else {
      validUser = [{ errorMessage: "wrong credentials" }];
    }
  }

  return NextResponse.json({ validUser });
};
