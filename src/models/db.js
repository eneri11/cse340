import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Define the testConnection function
export async function testConnection() {
  const result = await pool.query('SELECT NOW()');
  return result;
}

// Keep your existing default export for queries
export default {
  query: (text, params) => pool.query(text, params),
};