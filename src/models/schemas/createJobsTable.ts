import pool from "../../config/db.ts";

async function createJobsTable() {
  const createTable = `
    CREATE EXTENSION pgcrypto;

    CREATE TABLE IF NOT EXISTS jobs (
      id UUID PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
      job_title TEXT NOT NULL,
      description TEXT NOT NULL,
      date_added DATE NOT NULL,
      expires TIMESTAMP NOT NULL,
      closed BOOLEAN NOT NULL,
      employer TEXT NOT NULL
  );
 `;

  try {
    await pool.query(createTable);
    console.log("Table 'jobs' created successfully");
  } catch (error) {
    console.error("Error creating 'jobs' table:", error);
  } finally {
    pool.end();
  }
}

createJobsTable();
