import {
    getAllOrganizations,
    getOrganizationById,
    getProjectsByOrganizationId,
    createOrganization,
    updateOrganization
} from '../models/organizations.js';

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

// Show the new organization form
export const showNewOrganizationForm = (req, res) => {
    res.render('new-organization', {
        title: 'New Organization'
    });
};


// Process the new organization form
export const processNewOrganizationForm = async (req, res, next) => {
    try {
        const {
            name,
            description,
            contact_email,
            logo_filename
        } = req.body;

        await createOrganization(
            name,
            description,
            contact_email,
            logo_filename
        );

        req.flash(
            'success',
            'Organization created successfully!'
        );

        res.redirect('/organizations');

    } catch (error) {
        req.flash('error', error.message);

        res.redirect('/new-organization');
    }
};


// Show the edit organization form
export const showEditOrganizationForm = async (req, res, next) => {
    try {
        const organizationId = req.params.id;

        const organization = await getOrganizationById(organizationId);

        if (!organization) {
            return res.status(404).render('errors/404', {
                title: 'Organization Not Found'
            });
        }

        res.render('edit-organization', {
            title: `Edit ${organization.name}`,
            organization
        });

    } catch (error) {
        next(error);
    }
};


// Process the edit organization form
export const processEditOrganizationForm = async (req, res, next) => {
    try {
        const organizationId = req.params.id;

        const {
            name,
            description,
            contact_email,
            logo_filename
        } = req.body;

        await updateOrganization(
            organizationId,
            name,
            description,
            contact_email,
            logo_filename
        );

        req.flash(
            'success',
            'Organization updated successfully!'
        );

        res.redirect(`/organization/${organizationId}`);

    } catch (error) {
        req.flash('error', error.message);

        res.redirect(`/edit-organization/${req.params.id}`);
    }
};