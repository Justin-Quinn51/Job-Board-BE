import pg from "pg";
import { config } from "dotenv";

config();

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, PORT } = process.env;

const { Pool } = pg;

const pool = new Pool({
  host: PGHOST,
  database: PGDATABASE,
  user: PGUSER,
  password: PGPASSWORD,
  port: Number(PORT),
  ssl: {
    rejectUnauthorized: false,
  },
});

async function getPgVersion() {
  const client = await pool.connect();
  try {
    const result = await client.query("SELECT version()");
    console.log(result.rows[0]);
  } finally {
    client.release();
  }
}

getPgVersion();

export default pool;
