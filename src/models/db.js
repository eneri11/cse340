import pkg from 'pg';
import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

const { Pool } = pkg;

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
    connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});

export const testConnection = async () => {
    try {
        const client = await pool.connect();
        console.log('Database connected successfully!');
        client.release();
    } catch (err) {
        console.error('Database connection error:', err.message);
    }
};

export default {
    query: (text, params) => pool.query(text, params),
};