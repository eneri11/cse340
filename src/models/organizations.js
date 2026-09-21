import db from './db.js';

export const getAllOrganizations = async () => {
    const sql = `SELECT organization_id, name, description FROM organization`;
    const result = await db.query(sql);
    return result.rows;
};

export const getOrganizationById = async (id) => {
    const sql = `SELECT organization_id, name, description FROM organization WHERE organization_id = $1`;
    const result = await db.query(sql, [id]);
    return result.rows[0];
};