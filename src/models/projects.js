import pool from './db.js'; // or whatever your DB connection file is named

import db from './db.js';

// Get all categories associated with a specific project ID
export async function getCategoriesByProjectId(projectId) {
  const query = `
    SELECT c.category_id, c.category_name
    FROM categories c
    JOIN project_categories pc ON c.category_id = pc.category_id
    WHERE pc.project_id = $1;
  `;
  const { rows } = await pool.query(query, [projectId]);
  return rows;
}

export const getAllProjects = async () => {
  const sql = `
    SELECT p.project_id, p.title, p.description, p.date, p.location, 
           p.organization_id, o.name AS organization_name
    FROM project p
    JOIN organization o ON p.organization_id = o.organization_id
  `;
  const result = await db.query(sql);
  return result.rows;
};

// 1. Get upcoming projects with a JOIN to get the organization name
export async function getUpcomingProjects(numberOfProjects) {
  const query = `
    SELECT p.project_id, p.title, p.description, p.date, p.location, p.organization_id, o.organization_name
    FROM projects p
    JOIN organizations o ON p.organization_id = o.organization_id
    WHERE p.date >= CURRENT_DATE
    ORDER BY p.date ASC
    LIMIT $1;
  `;
  const { rows } = await pool.query(query, [numberOfProjects]);
  return rows;
}

// 2. Get a single project details by ID with a JOIN
export async function getProjectDetails(id) {
  const query = `
    SELECT p.project_id, p.title, p.description, p.date, p.location, p.organization_id, o.organization_name
    FROM projects p
    JOIN organizations o ON p.organization_id = o.organization_id
    WHERE p.project_id = $1;
  `;
  const { rows } = await pool.query(query, [id]);
  return rows[0]; // Return the single project object
}

// Get all projects associated with a specific organization ID
export async function getProjectsByOrganizationId(organizationId) {
  const query = `
    SELECT project_id, title, description, date, location, organization_id
    FROM projects
    WHERE organization_id = $1
    ORDER BY date ASC;
  `;
  const { rows } = await pool.query(query, [organizationId]);
  return rows;
}