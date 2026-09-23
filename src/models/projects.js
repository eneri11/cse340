import db from './db.js';

export async function getAllProjects() {
  const { rows } = await db.query(
    `SELECT p.*, o.name AS organization_name 
     FROM projects p
     LEFT JOIN organizations o ON p.organization_id = o.organization_id
     ORDER BY p.date ASC;`
  );
  return rows;
}

// Retrieve a single project by its ID (along with organization details if needed)
export async function getProjectById(projectId) {
  const { rows } = await db.query(
    `SELECT p.*, o.name AS organization_name, o.organization_id 
     FROM projects p
     LEFT JOIN organizations o ON p.organization_id = o.organization_id
     WHERE p.project_id = $1;`,
    [projectId]
  );
  return rows[0];
}

// Retrieve the next five upcoming service projects
export async function getUpcomingProjects() {
  const { rows } = await db.query(
    `SELECT p.*, o.name AS organization_name, o.organization_id 
     FROM projects p
     LEFT JOIN organizations o ON p.organization_id = o.organization_id
     WHERE p.date >= CURRENT_DATE
     ORDER BY p.date ASC 
     LIMIT 5;`
  );
  return rows;
}

// Retrieve all categories for a given project ID (for category tags)
export async function getCategoriesByProjectId(projectId) {
  const { rows } = await db.query(
    `SELECT c.* FROM categories c
     JOIN projects p ON p.category_id = c.category_id
     WHERE p.project_id = $1;`,
    [projectId]
  );
  return rows;
}