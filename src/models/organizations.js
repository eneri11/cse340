import db from './db.js';

// Get all organizations
export async function getAllOrganizations() {
    const { rows } = await db.query(
        `SELECT organization_id,
                name,
                description,
                contact_email,
                logo_filename
         FROM organizations
         ORDER BY name ASC;`
    );

    return rows;
}

// Get one organization by ID
export async function getOrganizationById(id) {
    const { rows } = await db.query(
        `SELECT organization_id,
                name,
                description,
                contact_email,
                logo_filename
         FROM organizations
         WHERE organization_id = $1;`,
        [id]
    );

    return rows[0];
}

// Get all projects for an organization
export async function getProjectsByOrganizationId(organizationId) {
    const { rows } = await db.query(
        `SELECT project_id,
                title,
                description,
                date,
                location
         FROM project
         WHERE organization_id = $1
         ORDER BY date ASC;`,
        [organizationId]
    );

    return rows;
}