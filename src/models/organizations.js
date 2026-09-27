import db from './db.js';

// Get all organizations
export const getAllOrganizations = async () => {
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
};

// Get one organization by ID
export const getOrganizationById = async (id) => {
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
};

// Get all projects for an organization
export const getProjectsByOrganizationId = async (organizationId) => {
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
};

// Create a new organization
export const createOrganization = async (
    name,
    description,
    contactEmail,
    logoFilename
) => {
    if (!name || name.trim().length === 0) {
        throw new Error('Organization name is required.');
    }

    if (name.trim().length > 255) {
        throw new Error('Organization name must be 255 characters or less.');
    }

    const { rows } = await db.query(
        `INSERT INTO organizations
            (name, description, contact_email, logo_filename)
         VALUES ($1, $2, $3, $4)
         RETURNING *;`,
        [
            name.trim(),
            description?.trim() || null,
            contactEmail?.trim() || null,
            logoFilename?.trim() || null
        ]
    );

    return rows[0];
};


// Update an existing organization
export const updateOrganization = async (
    organizationId,
    name,
    description,
    contactEmail,
    logoFilename
) => {
    if (!name || name.trim().length === 0) {
        throw new Error('Organization name is required.');
    }

    if (name.trim().length > 255) {
        throw new Error('Organization name must be 255 characters or less.');
    }

    const { rows } = await db.query(
        `UPDATE organizations
         SET name = $1,
             description = $2,
             contact_email = $3,
             logo_filename = $4
         WHERE organization_id = $5
         RETURNING *;`,
        [
            name.trim(),
            description?.trim() || null,
            contactEmail?.trim() || null,
            logoFilename?.trim() || null,
            organizationId
        ]
    );

    if (rows.length === 0) {
        throw new Error('Organization not found or could not be updated.');
    }

    return rows[0];
};