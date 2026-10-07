import {
    getProjectById,
    getUpcomingProjects,
    updateProject,
    createProject
} from '../models/projects.js';

import {
    getCategoriesByProjectId,
    getAllCategories,
    addCategoryToProject,
    removeCategoryFromProject
} from '../models/categories.js';

import {
    addVolunteer,
    removeVolunteer,
    isUserVolunteer
} from '../models/volunteers.js';

import {
    getAllOrganizations
} from '../models/organizations.js';

export const showProjectsPage = async (req, res, next) => {
    try {
        const projects = await getUpcomingProjects();

        res.render('projects', {
            title: 'Service Projects',
            projects
        });
    } catch (error) {
        next(error);
    }
};

export const showProjectDetailsPage = async (req, res, next) => {
    try {
        const projectId = req.params.id;

        const project = await getProjectById(projectId);

        if (!project) {
            return res.status(404).render('errors/404', {
                title: 'Project Not Found'
            });
        }

        const categories = await getCategoriesByProjectId(projectId);

        let isVolunteer = false;

        if (req.session && req.session.user) {
            isVolunteer = await isUserVolunteer(
                req.session.user.user_id,
                projectId
            );
        }

        res.render('project-detail', {
            title: project.title,
            project,
            categories,
            isVolunteer
        });

    } catch (error) {
        next(error);
    }
};

// Show the edit project form
export const showEditProjectForm = async (req, res, next) => {
    try {
        const projectId = req.params.id;

        const project = await getProjectById(projectId);

        if (!project) {
            return res.status(404).render('errors/404', {
                title: 'Project Not Found'
            });
        }

        const organizations = await getAllOrganizations();

        res.render('edit-project', {
            title: `Edit ${project.title}`,
            project,
            organizations
        });
    } catch (error) {
        next(error);
    }
};

// Process the edit project form
export const processEditProjectForm = async (req, res, next) => {
    try {
        const projectId = req.params.id;

        const {
            title,
            description,
            location,
            date,
            organization_id
        } = req.body;

        await updateProject(
            projectId,
            title,
            description,
            location,
            date,
            organization_id
        );

        req.flash(
            'success',
            'Project updated successfully!'
        );

        res.redirect(`/project/${projectId}`);

    } catch (error) {
        req.flash('error', error.message);

        res.redirect(`/edit-project/${req.params.id}`);
    }
};

// Show the update project categories page
export const showUpdateProjectCategories = async (req, res, next) => {
    try {
        const projectId = req.params.id;

        const project = await getProjectById(projectId);

        if (!project) {
            return res.status(404).render('errors/404', {
                title: 'Project Not Found'
            });
        }

        // Get all available categories
        const categories = await getAllCategories();

        // Get categories currently assigned to this project
        const assignedCategories = await getCategoriesByProjectId(projectId);

        // Create an array containing only the category IDs
        const assignedCategoryIds = assignedCategories.map(
            category => category.category_id
        );

        res.render('project-categories', {
            title: `Update Categories - ${project.title}`,
            project,
            categories,
            assignedCategoryIds
        });

    } catch (error) {
        next(error);
    }
};


// Process the update project categories form
export const processUpdateProjectCategories = async (req, res, next) => {
    try {
        const projectId = req.params.id;

        const project = await getProjectById(projectId);

        if (!project) {
            return res.status(404).render('errors/404', {
                title: 'Project Not Found'
            });
        }

        // Get the selected category IDs from the form
        let selectedCategoryIds = req.body.category_ids || [];

        // If only one checkbox is selected, Express gives us a string.
        // Convert it into an array so we can handle both cases.
        if (!Array.isArray(selectedCategoryIds)) {
            selectedCategoryIds = [selectedCategoryIds];
        }

        // Convert the category IDs from strings to numbers
        selectedCategoryIds = selectedCategoryIds.map(Number);

        // Get all valid categories
        const allCategories = await getAllCategories();

        // Keep only category IDs that actually exist
        selectedCategoryIds = selectedCategoryIds.filter(categoryId =>
            allCategories.some(
                category => category.category_id === categoryId
            )
        );

        // Get the categories currently assigned to the project
        const currentCategories = await getCategoriesByProjectId(projectId);

        const currentCategoryIds = currentCategories.map(
            category => category.category_id
        );

        // Remove categories that were unchecked
        for (const categoryId of currentCategoryIds) {
            if (!selectedCategoryIds.includes(categoryId)) {
                await removeCategoryFromProject(
                    projectId,
                    categoryId
                );
            }
        }

        // Add categories that were checked
        for (const categoryId of selectedCategoryIds) {
            if (!currentCategoryIds.includes(categoryId)) {
                await addCategoryToProject(
                    projectId,
                    categoryId
                );
            }
        }

        req.flash(
            'success',
            'Project categories updated successfully!'
        );

        res.redirect(`/project/${projectId}`);

    } catch (error) {
        req.flash('error', error.message);

        res.redirect(`/project/${req.params.id}/categories`);
    }
};

// Show the new project form
export const showNewProjectForm = async (req, res, next) => {
    try {
        const organizations = await getAllOrganizations();

        res.render('new-project', {
            title: 'New Project',
            organizations
        });

    } catch (error) {
        next(error);
    }
};


// Process the new project form
export const processNewProjectForm = async (req, res, next) => {
    try {
        const {
            title,
            description,
            location,
            date,
            organization_id
        } = req.body;

        // Server-side validation
        if (
            !title ||
            !description ||
            !location ||
            !date ||
            !organization_id
        ) {
            req.flash(
                'error',
                'All project fields are required.'
            );

            return res.redirect('/new-project');
        }

        await createProject(
            title,
            description,
            location,
            date,
            organization_id
        );

        req.flash(
            'success',
            'Project created successfully!'
        );

        res.redirect('/projects');

    } catch (error) {
        req.flash('error', error.message);

        res.redirect('/new-project');
    }
};

// Add the logged-in user as a volunteer
export const processVolunteerSignup = async (req, res, next) => {
    try {
        const projectId = req.params.id;
        const userId = req.session.user.user_id;

        await addVolunteer(userId, projectId);

        req.flash(
            'success',
            'You are now volunteering for this project!'
        );

        res.redirect(`/project/${projectId}`);

    } catch (error) {
        next(error);
    }
};


// Remove the logged-in user as a volunteer
export const processVolunteerRemoval = async (req, res, next) => {
    try {
        const projectId = req.params.id;
        const userId = req.session.user.user_id;

        await removeVolunteer(userId, projectId);

        req.flash(
            'success',
            'You are no longer volunteering for this project.'
        );

        res.redirect(`/project/${projectId}`);

    } catch (error) {
        next(error);
    }
};