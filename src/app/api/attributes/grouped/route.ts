import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export const GET = async (req: Request) => {
  const attributes = await query({
    //     query: `SELECT
    //     a.id AS attribute_id,
    //     a.name AS attribute_name,
    //     GROUP_CONCAT(av.id) AS attribute_value_ids,
    //     GROUP_CONCAT(av.name) AS attribute_values
    // FROM
    //     attributes a
    // LEFT JOIN
    //     attribute_values av ON a.id = av.atr_id
    // GROUP BY
    //     a.id, a.name;
    // ;
    //   `,
    query: `SELECT
    a.id AS attribute_id,
    a.name AS attribute_name,
    CONCAT('[', GROUP_CONCAT(JSON_OBJECT('id', av.id, 'name', av.name)), ']') AS attribute_values
    FROM
        attributes a
    LEFT JOIN
        attribute_values av ON a.id = av.atr_id
    GROUP BY
        a.id, a.name;
`,
    values: [],
  });

  return NextResponse.json(attributes);
};
