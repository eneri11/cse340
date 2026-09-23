import { getOrganizationById, getProjectsByOrganizationId } from '../models/organizations.js';

export async function showOrganizationDetails(req, res, next) {
  try {
    const orgId = req.params.id;
    const organization = await getOrganizationById(orgId);
    
    if (!organization) {
      return res.status(404).render('404', { title: 'Organization Not Found' });
    }

    const projects = await getProjectsByOrganizationId(orgId);

    res.render('organization-detail', {
      title: organization.name,
      organization,
      projects
    });
  } catch (error) {
    next(error);
  }
}