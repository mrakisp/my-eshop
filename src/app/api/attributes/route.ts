import { NextResponse } from "next/server";
import { query } from "@/lib/db";
// import typesGreekUtils from "greek-utils";

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const pageNumber = searchParams.get("pageNumber")
    ? parseInt(searchParams.get("pageNumber")!)
    : 1;
  const pageSize = searchParams.get("pageSize")
    ? parseInt(searchParams.get("pageSize")!)
    : 50;

  const offset = (pageNumber - 1) * pageSize;

  const product_attributes = await query({
    query: `
    SELECT *, (SELECT COUNT(*) FROM attributes) AS totalAttributesCount
    FROM attributes
    LIMIT ?, ?;
  `,
    values: [offset, pageSize],
  });

  return NextResponse.json(product_attributes);
};

export const POST = async (req: Request, res: Response) => {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");

  const requestBody = await req.json();
  const attrName = requestBody.attrName;

  const attrId = requestBody.attrId;
  // const attr_slug = typesGreekUtils
  //   .toGreeklish(attrName.replace(" ", "-"))
  //   .toLowerCase();

  let message = { completed: false, error: "" };
  let dbQuery;
  let Qvalues;

  if (type === "update") {
    dbQuery = `UPDATE attributes SET name = ? WHERE id = ?`;
    Qvalues = [attrName, attrId];
  } else if (type === "delete") {
    dbQuery = "DELETE FROM attributes WHERE id = ?";
    Qvalues = [attrId];
  } else {
    dbQuery = `INSERT INTO attributes (name) VALUES (?)`;
    Qvalues = [attrName];
  }

  await query({
    query: dbQuery,
    values: Qvalues,
  })
    .then((response: any) => {
      if (response.affectedRows === 1) {
        message = { completed: true, error: "" };
      } else {
        message = { completed: false, error: response.error };
      }
    })
    .catch((err) => {
      console.log(err);
      message = { completed: false, error: err };
    });

  return NextResponse.json(message);
};
