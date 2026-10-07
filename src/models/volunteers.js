import db from './db.js';

// Add a user as a volunteer for a project
export const addVolunteer = async (userId, projectId) => {
    const { rows } = await db.query(
        `INSERT INTO project_volunteer (user_id, project_id)
         VALUES ($1, $2)
         ON CONFLICT (user_id, project_id) DO NOTHING
         RETURNING user_id, project_id;`,
        [userId, projectId]
    );

    return rows[0] || null;
};


// Remove a user from a project's volunteer list
export const removeVolunteer = async (userId, projectId) => {
    const { rows } = await db.query(
        `DELETE FROM project_volunteer
         WHERE user_id = $1
           AND project_id = $2
         RETURNING user_id, project_id;`,
        [userId, projectId]
    );

    return rows[0] || null;
};


// Get all projects a user has volunteered for
export const getVolunteerProjects = async (userId) => {
    const { rows } = await db.query(
        `SELECT
            p.project_id,
            p.title,
            p.description,
            p.location,
            p.date,
            p.organization_id,
            o.name AS organization_name
         FROM project_volunteer pv
         JOIN project p
             ON pv.project_id = p.project_id
         LEFT JOIN organizations o
             ON p.organization_id = o.organization_id
         WHERE pv.user_id = $1
         ORDER BY p.date ASC;`,
        [userId]
    );

    return rows;
};


// Check whether a user is already volunteering for a project
export const isUserVolunteer = async (userId, projectId) => {
    const { rows } = await db.query(
        `SELECT 1
         FROM project_volunteer
         WHERE user_id = $1
           AND project_id = $2
         LIMIT 1;`,
        [userId, projectId]
    );

    return rows.length > 0;
};