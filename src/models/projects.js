import db from './db.js';

// Get all service projects
export const getAllProjects = async () => {
    const { rows } = await db.query(
        `SELECT p.*,
                o.name AS organization_name,
                o.organization_id
         FROM project p
         LEFT JOIN organizations o
             ON p.organization_id = o.organization_id
         ORDER BY p.date ASC;`
    );

    return rows;
};

// Get one project by ID
export const getProjectById = async (projectId) => {
    const { rows } = await db.query(
        `SELECT p.*,
                o.name AS organization_name,
                o.organization_id
         FROM project p
         LEFT JOIN organizations o
             ON p.organization_id = o.organization_id
         WHERE p.project_id = $1;`,
        [projectId]
    );

    return rows[0];
};

// Get the next five upcoming projects
export const getUpcomingProjects = async () => {
    const { rows } = await db.query(
        `SELECT p.*,
                o.name AS organization_name,
                o.organization_id
         FROM project p
         LEFT JOIN organizations o
             ON p.organization_id = o.organization_id
         WHERE p.date >= CURRENT_DATE
         ORDER BY p.date ASC
         LIMIT 5;`
    );

    return rows;
};

// Update a service project
export const updateProject = async (
    projectId,
    title,
    description,
    location,
    date,
    organizationId
) => {
    const { rows } = await db.query(
        `UPDATE project
         SET title = $1,
             description = $2,
             location = $3,
             date = $4,
             organization_id = $5
         WHERE project_id = $6
         RETURNING *;`,
        [
            title,
            description,
            location,
            date,
            organizationId,
            projectId
        ]
    );

    if (rows.length === 0) {
        throw new Error('Project not found or could not be updated.');
    }

    return rows[0];
};