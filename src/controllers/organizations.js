import { getAllOrganizations, getOrganizationById } from '../models/organizations.js';

export const showOrganizationsPage = async (req, res) => {
    try {
        const organizations = await getAllOrganizations();
        res.render('organizations', { title: 'Organizations', organizations });
    } catch (error) {
        console.error(error);
        res.status(500).render('error', { error });
    }
};

export const showOrganizationDetailsPage = async (req, res) => {
    try {
        const id = req.params.id;
        const organization = await getOrganizationById(id);
        res.render('organization-detail', { title: organization.name, organization });
    } catch (error) {
        console.error(error);
        res.status(500).render('error', { error });
    }
};