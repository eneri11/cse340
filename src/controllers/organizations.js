import { getAllOrganizations, getOrganizationById, getProjectsByOrganizationId } from '../models/organizations.js';

// Controller for listing all organizations (/organizations)
export const showOrganizationsPage = async (req, res, next) => {
    try {
        const organizations = await getAllOrganizations();
        res.render('organizations', { 
            title: 'Partner Organizations', 
            organizations 
        });
    } catch (error) {
        next(error);
    }
};

// Controller for a single organization's detail page (/organization/:id)
export const showOrganizationDetailsPage = async (req, res, next) => {
    try {
        const orgId = req.params.id;
        const organization = await getOrganizationById(orgId);

        if (!organization) {
            return res.status(404).render('errors/404', { title: 'Organization Not Found' });
        }

        // Fetch projects belonging to this organization
        const projects = await getProjectsByOrganizationId(orgId);

        res.render('organization-detail', {
            title: organization.name,
            organization,
            projects
        });
    } catch (error) {
        console.error("Error fetching organization details:", error);
        next(error);
    }
}