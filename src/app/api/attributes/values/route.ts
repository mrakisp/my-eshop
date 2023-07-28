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

  const atr_id = searchParams.get("atr_id");

  const offset = (pageNumber - 1) * pageSize;

  const product_attributeValues = await query({
    query: `
    SELECT *, (SELECT COUNT(*) FROM attribute_values) AS totalAttributeValuesCount
    FROM attribute_values WHERE atr_id = ?
    LIMIT ?, ?;
  `,
    values: [atr_id, offset, pageSize],
  });

  return NextResponse.json(product_attributeValues);
};

export const POST = async (req: Request, res: Response) => {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");

  const requestBody = await req.json();
  const name = requestBody.name;

  const atr_id = requestBody.atr_id;
  const id = requestBody.id;
  // const attr_slug = typesGreekUtils
  //   .toGreeklish(attrName.replace(" ", "-"))
  //   .toLowerCase();

  let message = { completed: false, error: "" };
  let dbQuery;
  let Qvalues;

  if (type === "update") {
    dbQuery = `UPDATE attribute_values SET name = ? WHERE id = ?`;
    Qvalues = [name, id];
  } else if (type === "delete") {
    dbQuery = "DELETE FROM attribute_values WHERE id = ?";
    Qvalues = [id];
  } else {
    dbQuery = `INSERT INTO attribute_values (name,atr_id) VALUES (?, ?)`;
    Qvalues = [name, atr_id];
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
