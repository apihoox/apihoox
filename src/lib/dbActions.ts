"use server";
import { db } from "./db";
interface QueryOptions {
  limit?: number;
  offset?: number;
}

export const findFirstWhere = async (
  table: string,
  column: string,
  value: string | number
) => {
  const result = await db.query(
    `SELECT * FROM ${table} WHERE ${column} = $1 LIMIT 1`,
    [value]
  );
  return result.rows[0];
};

export const findFirstWithMultiCondition = async (
  table: string,
  conditions: { [key: string]: any }
) => {
  const keys = Object.keys(conditions);
  const values = Object.values(conditions);
  const whereClause = keys
    .map((key, index) => `${key} = $${index + 1}`)
    .join(" AND ");

  const query = `SELECT * FROM ${table} WHERE ${whereClause} LIMIT 1`;
  const result = await db.query(query, values);

  return result.rows[0];
};

export const insertRowIntoTable = async (table: string, data: any) => {
  // Extract columns and values from the data object
  const columns = Object.keys(data);
  const values = Object.values(data);
  // Create a parameterized query string
  const columnsStr = columns.join(", ");
  const placeholders = columns.map((_, index) => `$${index + 1}`).join(", ");
  const query = `INSERT INTO ${table} (${columnsStr}) VALUES (${placeholders}) RETURNING *`;

  try {
    const result = await db.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error inserting data:", error);
    throw error;
  }
};

interface QueryOptions {
  limit?: number;
  offset?: number;
}

export const findAll = async (table: string, options?: QueryOptions) => {
  const limit = Math.min(options?.limit ?? 50, 50);
  const offset = (options?.offset ?? 0) * limit; // Default to 0 if not provided

  // Fetch data query
  const dataQuery = `SELECT * FROM ${table} ORDER BY updated_at DESC LIMIT $1 OFFSET $2`;
  const dataValues = [limit, offset];

  // Count query
  const countQuery = `SELECT COUNT(*) as total FROM ${table}`;
  const countResult = await db.query(countQuery);
  const rowCount = parseInt(countResult.rows[0].total, 10);

  // Fetch data
  const dataResult = await db.query(dataQuery, dataValues);
  const data = dataResult.rows;

  return { data, rowCount };
};

export const deleteWhere = async (
  table: string,
  conditions: { [key: string]: any }
) => {
  const keys = Object.keys(conditions);
  const values = Object.values(conditions);
  const whereClause = keys
    .map((key, index) => `${key} = $${index + 1}`)
    .join(" AND ");

  const query = `DELETE FROM ${table} WHERE ${whereClause}`;
  const result = await db.query(query, values);

  return result;
};

export const findAllWhere = async (
  table: string,
  column: string,
  value: string | number | boolean
) => {
  const result = await db.query(
    `SELECT * FROM ${table} WHERE ${column} = $1 `,
    [value]
  );
  return result.rows;
};

export const findAllWithMultiCondition = async (
  table: string,
  conditions: { [key: string]: any },
  options?: QueryOptions
) => {
  const keys = Object.keys(conditions);
  const values = Object.values(conditions);

  const whereClause = keys
    .map((key, index) => `${key} = $${index + 1}`)
    .join(" AND ");

  // Set defaults for limit and offset
  const limit = Math.min(options?.limit ?? 50, 50);
  const offset = (options?.offset ?? 0) * limit;

  // Query to get the filtered data
  let dataQuery = `SELECT * FROM ${table}`;

  if (whereClause) {
    dataQuery += ` WHERE ${whereClause}`;
  }

  dataQuery += ` ORDER BY updated_at DESC`;
  dataQuery += ` LIMIT $${values.length + 1} OFFSET $${values.length + 2}`;

  // Adding limit and offset to values array
  values.push(limit, offset);

  // Execute the data query
  const dataResult = await db.query(dataQuery, values);
  const data = dataResult.rows;

  // Query to get the total row count
  let countQuery = `SELECT COUNT(*) as total FROM ${table}`;

  if (whereClause) {
    countQuery += ` WHERE ${whereClause}`;
  }

  const countResult = await db.query(countQuery, values.slice(0, -2)); // Using only condition values for count query
  const rowCount = parseInt(countResult.rows[0].total, 10);

  return { data, rowCount };
};

export const updateRowInTable = async (
  table: string,
  data: any,
  providedId: string
) => {
  data.updated_at = new Date().toISOString();
  // Extract columns and values from the data object
  const columns = Object.keys(data);
  const values = Object.values(data);

  // Create a parameterized query string
  const setClause = columns
    .map((col, index) => `${col} = $${index + 1}`)
    .join(", ");

  // Construct the WHERE condition
  const whereCondition = `WHERE id = $${columns.length + 1}`;

  const query = `UPDATE ${table} SET ${setClause} ${whereCondition} RETURNING *`;

  try {
    const result = await db.query(query, [...values, providedId]);
    return result.rows[0];
  } catch (error) {
    console.error("Error updating data:", error);
    throw error;
  }
};

interface UpdateData {
  id: string;
  data: any;
}
export const batchUpdateRowsInTable = async (
  table: string,
  updates: UpdateData[]
) => {
  // Start a transaction
  const client = await db.connect();
  try {
    await client.query("BEGIN");

    const updatePromises = updates.map(async (update) => {
      const { id, data } = update;
      data.updated_at = new Date().toISOString();

      // Extract columns and values from the data object
      const columns = Object.keys(data);
      const values = Object.values(data);

      // Create a parameterized query string
      const setClause = columns
        .map((col, index) => `${col} = $${index + 1}`)
        .join(", ");

      // Construct the WHERE condition
      const whereCondition = `WHERE id = $${columns.length + 1}`;

      const query = `UPDATE ${table} SET ${setClause} ${whereCondition} RETURNING *`;

      const result = await client.query(query, [...values, id]);
      return result.rows[0];
    });

    const results = await Promise.all(updatePromises);

    // Commit the transaction
    await client.query("COMMIT");
    return results;
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error updating data:", error);
    throw error;
  } finally {
    client.release();
  }
};

export const upsertRowIntoTable = async (
  table: string,
  data: any,
  conflictTarget: string | string[], // Column(s) on which conflict check will be made
  updateColumns?: string[] // Columns to be updated in case of conflict
) => {
  data.updated_at = new Date().toISOString();
  // Extract columns and values from the data object
  const columns = Object.keys(data);
  const values = Object.values(data);

  // Create a parameterized query string for insertion
  const columnsStr = columns.join(", ");
  const placeholders = columns.map((_, index) => `$${index + 1}`).join(", ");

  // Create the conflict target and update statement
  const conflictTargetStr = Array.isArray(conflictTarget)
    ? conflictTarget.join(", ")
    : conflictTarget;

  const updateStr = updateColumns
    ? updateColumns.map((col) => `${col} = EXCLUDED.${col}`).join(", ")
    : columns.map((col) => `${col} = EXCLUDED.${col}`).join(", ");

  const query = `INSERT INTO ${table} (${columnsStr}) VALUES (${placeholders})
                 ON CONFLICT (${conflictTargetStr}) DO UPDATE SET ${updateStr}
                 RETURNING *`;

  try {
    const result = await db.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error inserting or updating data:", error);
    throw error;
  }
};

export type Condition = {
  key: string;
  operator:
    | ">"
    | ">="
    | "="
    | "<"
    | "<="
    | "!="
    | "LIKE"
    | "ILIKE"
    | "NOT LIKE"
    | "NOT ILIKE";
  value: any;
};

export const findAllWithComplexConditions = async (
  table: string,
  conditions: Condition[]
) => {
  const whereClauseParts: string[] = [];
  const values: any[] = [];

  conditions.forEach((condition, index) => {
    if (
      condition.operator === ">" ||
      condition.operator === ">=" ||
      condition.operator === "=" ||
      condition.operator === "<" ||
      condition.operator === "<=" ||
      condition.operator === "!="
    ) {
      whereClauseParts.push(
        `${condition.key} ${condition.operator} $${index + 1}`
      );
    } else if (
      condition.operator === "LIKE" ||
      condition.operator === "ILIKE" ||
      condition.operator === "NOT LIKE" ||
      condition.operator === "NOT ILIKE"
    ) {
      whereClauseParts.push(
        `${condition.key} ${condition.operator} $${index + 1}`
      );
    }
    values.push(condition.value);
  });

  const whereClause = whereClauseParts.join(" AND ");
  const query = `SELECT * FROM ${table} WHERE ${whereClause}`;
  const result = await db.query(query, values);
  const data = result.rows;
  const rowCount = result.rowCount;
  return { data, rowCount };
};

export const findCountAllWithMultiCondition = async (
  table: string,
  conditions: { [key: string]: any }
) => {
  const keys = Object.keys(conditions);
  const values = Object.values(conditions);
  const whereClause = keys
    .map((key, index) => `${key} = $${index + 1}`)
    .join(" AND ");

  const query = `SELECT COUNT(*) as total FROM ${table} WHERE ${whereClause}`;
  const result = await db.query(query, values);
  const count = parseInt(result.rows[0].total, 10);

  return count;
};

export const findCountAll = async (table: string) => {
  const countQuery = `SELECT COUNT(*) as total FROM ${table}`;
  const countResult = await db.query(countQuery);
  const rowCount = parseInt(countResult.rows[0].total, 10);

  return rowCount;
};

export const findCountAllWithComplexConditions = async (
  table: string,
  conditions: Condition[]
) => {
  const whereClauseParts: string[] = [];
  const values: any[] = [];

  conditions.forEach((condition, index) => {
    if (
      condition.operator === ">" ||
      condition.operator === ">=" ||
      condition.operator === "=" ||
      condition.operator === "<" ||
      condition.operator === "<=" ||
      condition.operator === "!="
    ) {
      whereClauseParts.push(
        `${condition.key} ${condition.operator} $${index + 1}`
      );
    } else if (
      condition.operator === "LIKE" ||
      condition.operator === "ILIKE" ||
      condition.operator === "NOT LIKE" ||
      condition.operator === "NOT ILIKE"
    ) {
      whereClauseParts.push(
        `${condition.key} ${condition.operator} $${index + 1}`
      );
    }
    values.push(condition.value);
  });

  const whereClause = whereClauseParts.join(" AND ");
  const query = `SELECT COUNT(*) as total FROM ${table} WHERE ${whereClause}`;
  const result = await db.query(query, values);
  const count = parseInt(result.rows[0].total, 10);

  return count;
};

export const batchInsertIntoTable = async (
  table: string,
  data: any[],
  conflictTarget: string | string[], // Column(s) on which conflict check will be made
  updateColumns?: string[] // Columns to be updated in case of conflict
) => {
  // Add updated_at for each row in the batch
  const batchData = data.map((row) => ({
    ...row,
    updated_at: new Date().toISOString(),
  }));

  // Extract columns from the first row of data (assuming all rows have the same structure)
  const columns = Object.keys(batchData[0]);

  // Create arrays of values for each row
  const values = batchData.map((row) => Object.values(row));

  // Create a parameterized query string for insertion
  const placeholders = values
    .map(
      (_, index) =>
        `(${columns
          .map((_, colIndex) => `$${index * columns.length + colIndex + 1}`)
          .join(", ")})`
    )
    .join(", ");

  // Build the conflict target string
  const conflictTargetStr = Array.isArray(conflictTarget)
    ? conflictTarget.join(", ")
    : conflictTarget;

  // Build the update statement if updateColumns are provided
  let updateStr = "";
  if (updateColumns && updateColumns.length > 0) {
    updateStr = `ON CONFLICT (${conflictTargetStr}) DO UPDATE SET ${updateColumns
      .map((col) => `${col} = EXCLUDED.${col}`)
      .join(", ")}`;
  }

  // Build the query
  const query = `INSERT INTO ${table} (${columns.join(", ")})
                 VALUES ${placeholders}
                 ${updateStr}`;

  try {
    // Flatten the values array for parameter binding
    const flattenedValues = values.reduce((acc, val) => acc.concat(val), []);
    const result = await db.query(query, flattenedValues);

    return result.rows;
  } catch (error) {
    console.error("Error batch inserting or updating data:", error);
    throw error;
  }
};

interface DeleteData {
  id: number | string;
}
export async function batchDeleteFromTable(
  table: string,
  dataToDelete: DeleteData[]
): Promise<void> {
  try {
    const deleteQueries = dataToDelete.map((data) => {
      // Extract id from each object
      const id = data.id;

      // Build the delete query
      return {
        text: `DELETE FROM ${table} WHERE id = $1`, // Adjust according to your table structure
        values: [id],
      };
    });

    // Execute all delete queries in a transaction
    await db.query("BEGIN");
    for (const query of deleteQueries) {
      await db.query(query.text, query.values);
    }
    await db.query("COMMIT");

    console.log(`Deleted ${dataToDelete.length} rows from ${table}.`);
  } catch (error) {
    await db.query("ROLLBACK");
    console.error("Error deleting data:", error);
    throw error;
  }
}

export const getCountAll = async (table: string, options?: QueryOptions) => {
  const countQuery = `SELECT COUNT(*) as total FROM ${table}`;
  const countResult = await db.query(countQuery);
  const rowCount = parseInt(countResult.rows[0].total, 10);
  return { rowCount };
};

export async function findByQuery(query: any, params: any) {
  try {
    const { rows } = await db.query(query, params);
    return { data: rows };
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
}
