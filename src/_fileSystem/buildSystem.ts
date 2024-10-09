import { db } from "@/lib/db";
import fs from "fs";
import path from "path";

export const runSqlFile = async () => {
  const client = await db.connect();
  const rootPath = process.cwd();
  const filePath = path.join(rootPath, "src/_dbScripts/authSchema.sql");
  try {
    // Read the contents of the .sql file

    const sql = fs.readFileSync(filePath, "utf8");

    // Split the SQL file content by semicolon to get individual statements
    const sqlStatements = sql
      .split(";")
      .map((statement) => statement.trim())
      .filter((statement) => statement.length > 0);

    // Execute each SQL statement
    for (const statement of sqlStatements) {
      await client.query(statement);
    }

    console.log("SQL file executed successfully");
    return "Schema created successfully";
  } catch (err) {
    console.error("Error executing SQL file:", err);
  } finally {
    client.release();
  }
};

export const readTenantSchemaFile = async (
  schemaName: string
): Promise<string[]> => {
  const rootPath = process.cwd();
  const filePath = path.join(rootPath, "src/_dbScripts/tenantSchema.sql");

  try {
    let sql = await fs.promises.readFile(filePath, "utf8");
    sql = sql.replace(/:schemaName/g, schemaName); // Replace the placeholder
    return sql.split(";").filter((statement) => statement.trim() !== ""); // Split and filter empty statements
  } catch (error) {
    console.error("Error reading SQL file:", error);
    throw error;
  }
};

export const createTenantSchema = async (tenantId: string) => {
  const client = await db.connect();

  const schemaName = tenantId;

  try {
    // Start a transaction
    await client.query("BEGIN");
    // Read and execute create schema script
    const createSchemaSQL = await readTenantSchemaFile(schemaName);
    for (const statement of createSchemaSQL) {
      await client.query(statement);
    }
    // Commit the transaction
    await client.query("COMMIT");
    await runSqlFile();
    return "Successfull";
  } catch (error) {
    // Rollback the transaction in case of an error
    await client.query("ROLLBACK");
    console.error("Error creating schema and tables:", error);
    throw error;
  }
};
