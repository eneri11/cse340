// src/models/organizationModel.js
import db from './db.js';

export async function getOrganizations() {
  const result = await db.query('SELECT * FROM organization ORDER BY name');
  return result.rows;
}