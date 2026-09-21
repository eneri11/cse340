import { getAllOrganizations, getOrganizationById } from '../models/organizations.js';

export const showOrganizationsPage = async (req, res) => {
    try {
        const organizations = await getAllOrganizations();
        res.render('organizations', { 
            title: 'Organizations', 
            organizations 
        });
    } catch (error) {
        console.error("Error loading organizations page:", error);
        res.status(500).render('error', { title: 'Error', error });
    }
};

export const showOrganizationDetailsPage = async (req, res) => {
    try {
        const orgId = req.params.id;
        const organization = await getOrganizationById(orgId);
        
        if (!organization) {
            return res.status(404).render('error', { title: 'Not Found', error: { message: 'Organization not found' } });
        }

        res.render('organization-detail', { 
            title: organization.name, 
            organization 
        });
    } catch (error) {
        console.error("Error loading organization details:", error);
        res.status(500).render('error', { title: 'Error', error });
    }
};