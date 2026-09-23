import db from './db.js';

// 1. Retrieve all categories
export async function getAllCategories() {
  const { rows } = await db.query('SELECT * FROM categories ORDER BY name ASC;');
  return rows;
}

// 2. Retrieve a single category by its ID
export async function getCategoryById(categoryId) {
  const { rows } = await db.query('SELECT * FROM categories WHERE category_id = $1;', [categoryId]);
  return rows[0];
}

// 3. Retrieve all service projects for a given category ID
export async function getProjectsByCategoryId(categoryId) {
  const { rows } = await db.query(
    `SELECT p.* FROM projects p 
     JOIN categories c ON p.category_id = c.category_id 
     WHERE c.category_id = $1 ORDER BY p.date ASC;`,
    [categoryId]
  );
  return rows;
}

// 4. Retrieve all categories for a given service project ID (for project tags)
export async function getCategoriesByProjectId(projectId) {
  const { rows } = await db.query(
    `SELECT c.* FROM categories c
     JOIN projects p ON p.category_id = c.category_id
     WHERE p.project_id = $1;`,
    [projectId]
  );
  return rows;
}