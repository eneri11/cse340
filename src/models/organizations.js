import db from './db.js';

// Retrieve all organizations
export async function getAllOrganizations() {
  const { rows } = await db.query('SELECT * FROM organizations ORDER BY 1 ASC;');
  return rows;
}

// Retrieve a single organization by ID
export async function getOrganizationById(organizationId) {
  const { rows } = await db.query('SELECT * FROM organizations WHERE organization_id = $1;', [organizationId]);
  return rows[0];
}

// Retrieve all service projects for a given organization ID
export async function getProjectsByOrganizationId(organizationId) {
  const { rows } = await db.query(
    'SELECT * FROM projects WHERE organization_id = $1 ORDER BY date ASC;',
    [organizationId]
  );
  return rows;
}