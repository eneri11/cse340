// src/models/projectModel.js
import db from './db.js';

export async function getProjects() {
  const result = await db.query('SELECT * FROM project ORDER BY name');
  return result.rows;
}

async function getCategoryById(categoryId) {
  const sql = 'SELECT * FROM categories WHERE category_id = $1';
  const result = await pool.query(sql, [categoryId]);
  return result.rows[0];
}

async function getCategoriesByProjectId(projectId) {
  const sql = `
    SELECT c.* FROM categories c
    JOIN project_categories pc ON c.category_id = pc.category_id
    WHERE pc.project_id = $1
  `;
  const result = await pool.query(sql, [projectId]);
  return result.rows;
}

async function getProjectsByCategoryId(categoryId) {
  const sql = `
    SELECT p.* FROM service_projects p
    JOIN project_categories pc ON p.project_id = pc.project_id
    WHERE pc.category_id = $1
  `;
  const result = await pool.query(sql, [categoryId]);
  return result.rows;
}