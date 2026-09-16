// src/models/projectModel.js
import db from './db.js';

export async function getProjects() {
  const result = await db.query('SELECT * FROM project ORDER BY name');
  return result.rows;
}