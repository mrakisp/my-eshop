import mysql from "mysql2/promise";

export async function query({
  query = "/",
  values = [],
}: {
  query: string;
  values?: any; //string[] | number[];
}) {
  const db = await mysql.createConnection({
    host: process.env.DB_HOST,
    //   port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  });

  try {
    const [results] = await db.execute(query, values);
    db.end();
    return results;
  } catch (error: any) {
    return { error };
  }
}
