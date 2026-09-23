import db from './db.js';

// Get organization details by ID
export async function getOrganizationById(orgId) {
  const query = `SELECT * FROM organizations WHERE organization_id = $1`;
  const { rows } = await db.query(query, [orgId]);
  return rows[0];
}

// Get projects for a specific organization
export async function getProjectsByOrganizationId(orgId) {
  const query = `
    SELECT project_id, title, description, date, location, organization_id
    FROM projects
    WHERE organization_id = $1
    ORDER BY date ASC;
  `;
  const { rows } = await db.query(query, [orgId]);
  return rows;
}