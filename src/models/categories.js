import db from './db.js';

// Get all categories
export async function getAllCategories() {
    const { rows } = await db.query(
        `SELECT *
         FROM category
         ORDER BY name ASC;`
    );

    return rows;
}

// Get one category by ID
export async function getCategoryById(categoryId) {
    const { rows } = await db.query(
        `SELECT *
         FROM category
         WHERE category_id = $1;`,
        [categoryId]
    );

    return rows[0];
}

// Get all projects for a category
export async function getProjectsByCategoryId(categoryId) {
    const { rows } = await db.query(
        `SELECT p.*
         FROM project p
         JOIN project_category pc
             ON p.project_id = pc.project_id
         WHERE pc.category_id = $1
         ORDER BY p.date ASC;`,
        [categoryId]
    );

    return rows;
}

// Get all categories for a project
export async function getCategoriesByProjectId(projectId) {
    const { rows } = await db.query(
        `SELECT c.*
         FROM category c
         JOIN project_category pc
             ON c.category_id = pc.category_id
         WHERE pc.project_id = $1
         ORDER BY c.name ASC;`,
        [projectId]
    );

    return rows;
}