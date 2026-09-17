import db from './db.js';

// 1. Get upcoming projects limited by a parameter
export async function getUpcomingProjects(numberOfProjects) {
  const sql = `
    SELECT p.project_id, p.title, p.description, p.date, p.location, 
           p.organization_id, o.name AS organization_name
    FROM project p
    JOIN organization o ON p.organization_id = o.organization_id
    WHERE p.date >= NOW()
    ORDER BY p.date ASC
    LIMIT $1
  `;
  const result = await db.query(sql, [numberOfProjects]);
  return result.rows;
}

// 2. Get details for a single project by ID
export async function getProjectDetails(id) {
  const sql = `
    SELECT p.project_id, p.title, p.description, p.date, p.location, 
           p.organization_id, o.name AS organization_name
    FROM project p
    JOIN organization o ON p.organization_id = o.organization_id
    WHERE p.project_id = $1
  `;
  const result = await db.query(sql, [id]);
  return result.rows[0];
}