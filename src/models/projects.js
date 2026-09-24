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