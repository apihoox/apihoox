import pg from "pg";
const { Pool } = pg;
import { NodePostgresAdapter } from "@lucia-auth/adapter-postgresql";

const connectionString = process.env.DATABASE_URL as string;

export const db = new Pool({
  connectionString,
});

export const setSearchPath = async (schemaName: string) => {
  const client = await db.connect();
  try {
    // Set the search_path
    await client.query(`SET search_path TO ${schemaName}`);
  } finally {
    // Release the client back to the pool
    client.release();
  }
};
export const adapter = new NodePostgresAdapter(db, {
  user: "auth_user",
  session: "user_session",
});
