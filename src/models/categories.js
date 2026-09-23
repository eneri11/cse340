import db from './db.js';

// Retrieve all categories
export async function getAllCategories() {
  const query = `
    SELECT category_id, category_name
    FROM categories
    ORDER BY category_name ASC;
  `;
  const { rows } = await db.query(query);
  return rows;
}

// 1. Retrieve a single category by its ID
export async function getCategoryById(categoryId) {
  const query = `
    SELECT category_id, category_name
    FROM categories
    WHERE category_id = $1;
  `;
  const { rows } = await db.query(query, [categoryId]);
  return rows[0]; 
}

// 2. Retrieve all service projects for a given category
export async function getProjectsByCategoryId(categoryId) {
  const query = `
    SELECT p.project_id, p.title, p.description, p.date, p.location, p.organization_id
    FROM projects p
    JOIN project_categories pc ON p.project_id = pc.project_id
    WHERE pc.category_id = $1
    ORDER BY p.date ASC;
  `;
  const { rows } = await db.query(query, [categoryId]);
  return rows;
}