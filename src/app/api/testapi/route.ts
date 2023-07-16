import { NextResponse } from "next/server";
import { query } from "../../lib/db";
// import { headers } from "next/headers";
// import { isAdminTokenValid } from "../../lib/validToken";

export const GET = async (req: Request, res: Response) => {
  // const { searchParams } = new URL(req.url);
  // const email = searchParams.get("email");
  // const password = searchParams.get("password");
  let tabs;

  tabs = await query({
    query: "SELECT * FROM product_tabs",
    values: [],
  });
  // }

  return NextResponse.json({ tabs });
};

export const POST = async (req: Request, res: Response) => {
  console.log("a");
};
