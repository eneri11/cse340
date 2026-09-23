import { getAllOrganizations, getOrganizationById, getProjectsByOrganizationId } from '../models/organizations.js';

// Controller to list all organizations
export async function showOrganizationsPage(req, res, next) {
    try {
        const organizations = await getAllOrganizations();
        res.render('organizations', { 
            title: 'Organizations', 
            organizations 
        });
    } catch (error) {
        next(error);
    }
}

// Controller to show single organization details and its projects
export async function showOrganizationDetailsPage(req, res, next) {
    try {
        const orgId = req.params.id;
        const organization = await getOrganizationById(orgId);
        
        if (!organization) {
            return res.status(404).render('errors/404', { title: 'Organization Not Found' });
        }

        const projects = await getProjectsByOrganizationId(orgId);

        res.render('organization-detail', { 
            title: organization.name || organization.organization_name,
            organization,
            projects
        });
    } catch (error) {
        next(error);
    }
}