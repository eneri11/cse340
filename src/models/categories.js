import db from './db.js';

export const getAllCategories = async () => {
    const sql = `SELECT category_id, name, description FROM category`;
    const result = await db.query(sql);
    return result.rows;
};

export const getCategoryById = async (id) => {
    const sql = `SELECT category_id, name, description FROM category WHERE category_id = $1`;
    const result = await db.query(sql, [id]);
    return result.rows[0];
};