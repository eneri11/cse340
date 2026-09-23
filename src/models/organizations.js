import db from './db.js';

// 1. Retrieve all organizations
export async function getAllOrganizations() {
  const query = `
    SELECT organization_id, organization_name, description, logo
    FROM organizations
    ORDER BY organization_name ASC;
  `;
  const { rows } = await db.query(query);
  return rows;
}

// 2. Retrieve a single organization by ID
export async function getOrganizationById(organizationId) {
  const query = `
    SELECT organization_id, organization_name, description, logo
    FROM organizations
    WHERE organization_id = $1;
  `;
  const { rows } = await db.query(query, [organizationId]);
  return rows[0];
}

// 3. Retrieve all service projects for a given organization ID
export async function getProjectsByOrganizationId(organizationId) {
  const query = `
    SELECT project_id, title, description, date, location, organization_id
    FROM projects
    WHERE organization_id = $1
    ORDER BY date ASC;
  `;
  const { rows } = await db.query(query, [organizationId]);
  return rows;
}