import db from './db.js';

// Retrieve all organizations dynamically
export async function getAllOrganizations() {
  const query = `
    SELECT *
    FROM organizations
    ORDER BY 1 ASC;
  `;
  const { rows } = await db.query(query);
  return rows;
}

// Retrieve a single organization by ID
export async function getOrganizationById(organizationId) {
  const query = `
    SELECT *
    FROM organizations
    WHERE organization_id = $1;
  `;
  const { rows } = await db.query(query, [organizationId]);
  return rows[0];
}

// Retrieve all service projects for a given organization ID
export async function getProjectsByOrganizationId(organizationId) {
  const query = `
    SELECT *
    FROM projects
    WHERE organization_id = $1;
  `;
  const { rows } = await db.query(query, [organizationId]);
  return rows;
}