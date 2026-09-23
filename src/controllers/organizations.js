import { getAllOrganizations, getOrganizationById, getProjectsByOrganizationId } from '../models/organizations.js';

export const showOrganizationsPage = async (req, res, next) => {
    try {
        const organizations = await getAllOrganizations();
        res.render('organizations', { 
            title: 'Organizations', 
            organizations 
        });
    } catch (error) {
        next(error);
    }
};

export const showOrganizationDetailsPage = async (req, res, next) => {
    try {
        const organizationId = req.params.id;
        const organization = await getOrganizationById(organizationId);
        
        if (!organization) {
            return res.status(404).render('404', { title: 'Organization Not Found' });
        }

        const projects = await getProjectsByOrganizationId(organizationId);

        res.render('organization-detail', { // Ensure this matches your EJS view filename
            title: organization.organization_name || organization.name,
            organization,
            projects
        });
    } catch (error) {
        next(error);
    }
};