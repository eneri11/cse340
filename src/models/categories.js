import db from './db.js';

// Get all categories
export const getAllCategories = async () => {
    const { rows } = await db.query(
        `SELECT *
         FROM category
         ORDER BY name ASC;`
    );

    return rows;
};

// Get one category by ID
export const getCategoryById = async (categoryId) => {
    const { rows } = await db.query(
        `SELECT *
         FROM category
         WHERE category_id = $1;`,
        [categoryId]
    );

    return rows[0];
};

// Get all projects for a category
export const getProjectsByCategoryId = async (categoryId) => {
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
};

// Get all categories for a project
export const getCategoriesByProjectId = async (projectId) => {
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
};

export const addCategoryToProject = async (projectId, categoryId) => {
    await db.query(
        `INSERT INTO project_category (project_id, category_id)
         VALUES ($1, $2)
         ON CONFLICT DO NOTHING;`,
        [projectId, categoryId]
    );
};

export const removeCategoryFromProject = async (projectId, categoryId) => {
    await db.query(
        `DELETE FROM project_category
         WHERE project_id = $1
         AND category_id = $2;`,
        [projectId, categoryId]
    );
};

// Create a new category
export const createCategory = async (name) => {

    // Server-side validation
    if (!name || name.trim().length === 0) {
        throw new Error('Category name is required.');
    }

    if (name.trim().length < 3) {
        throw new Error('Category name must be at least 3 characters.');
    }

    if (name.trim().length > 100) {
        throw new Error('Category name must be 100 characters or less.');
    }

    const { rows } = await db.query(
        `INSERT INTO category (name)
         VALUES ($1)
         RETURNING *;`,
        [name.trim()]
    );

    return rows[0];
};

// Update an existing category
export const updateCategory = async (categoryId, name) => {

    // Server-side validation
    if (!name || name.trim().length === 0) {
        throw new Error('Category name is required.');
    }

    if (name.trim().length < 3) {
        throw new Error('Category name must be at least 3 characters.');
    }

    if (name.trim().length > 100) {
        throw new Error('Category name must be 100 characters or less.');
    }

    const { rows } = await db.query(
        `UPDATE category
         SET name = $1
         WHERE category_id = $2
         RETURNING *;`,
        [name.trim(), categoryId]
    );

    if (rows.length === 0) {
        throw new Error('Category not found or could not be updated.');
    }

    return rows[0];
};