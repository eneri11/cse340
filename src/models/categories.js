import pool from './db.js';

// 1. Retrieve a single category by its ID
export async function getCategoryById(categoryId) {
  const query = `
    SELECT category_id, category_name
    FROM categories
    WHERE category_id = $1;
  `;
  const { rows } = await pool.query(query, [categoryId]);
  return rows[0]; // Return a single category object
}

// 3. Retrieve all service projects for a given category
export async function getProjectsByCategoryId(categoryId) {
  const query = `
    SELECT p.project_id, p.title, p.description, p.date, p.location, p.organization_id
    FROM projects p
    JOIN project_categories pc ON p.project_id = pc.project_id
    WHERE pc.category_id = $1
    ORDER BY p.date ASC;
  `;
  const { rows } = await pool.query(query, [categoryId]);
  return rows;
}