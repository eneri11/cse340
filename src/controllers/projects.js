import {
    getProjectById,
    getUpcomingProjects,
    updateProject
} from '../models/projects.js';

import {
    getCategoriesByProjectId
} from '../models/categories.js';

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

        res.render('project-detail', {
            title: project.title,
            project,
            categories
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

        res.redirect(`/project/${projectId}`);
    } catch (error) {
        next(error);
    }
};