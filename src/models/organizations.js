import db from './db.js';

export async function getAllOrganizations() {
  const query = `
    SELECT organization_id, name, description, contact_email, logo_filename
    FROM public.organization;
  `;
  const result = await db.query(query);
  return result.rows;
}