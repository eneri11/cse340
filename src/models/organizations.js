import db from './db.js';

// Get all organizations for the /organizations list page
export async function getAllOrganizations() {
    const { rows } = await db.query(
        `SELECT organization_id, name, description, logo 
         FROM organizations 
         ORDER BY name ASC;`
    );
    return rows;
}

// Get a single organization by its ID for the /organization/:id detail page
export async function getOrganizationById(id) {
    const { rows } = await db.query(
        `SELECT organization_id, name, description, logo 
         FROM organizations 
         WHERE organization_id = $1;`,
        [id]
    );
    return rows[0];
}

// Optional: Get all projects associated with a specific organization
export async function getProjectsByOrganizationId(organizationId) {
    const { rows } = await db.query(
        `SELECT project_id, title, description, date, location 
         FROM projects 
         WHERE organization_id = $1 
         ORDER BY date ASC;`,
        [organizationId]
    );
    return rows;
}