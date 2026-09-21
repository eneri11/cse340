import { getAllProjects, getProjectDetails } from '../models/projects.js';

export const showProjectsPage = async (req, res) => {
    try {
        const projects = await getAllProjects();
        res.render('projects', { title: 'Service Projects', projects });
    } catch (error) {
        console.error("Error loading projects page:", error);
        res.status(500).render('error', { title: 'Error', error });
    }
};

export const showProjectDetailsPage = async (req, res) => {
    try {
        const projectId = req.params.id;
        const project = await getProjectDetails(projectId);
        
        if (!project) {
            return res.status(404).render('404', { title: 'Project Not Found' });
        }

        res.render('project', { title: project.title, project });
    } catch (error) {
        console.error("Error loading project details:", error);
        res.status(500).render('error', { title: 'Error', error });
    }
};