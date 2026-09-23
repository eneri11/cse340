import { getAllProjects, getProjectDetails, getCategoriesByProjectId } from '../models/projects.js';

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

        // Fetch categories/tags for this specific project
        const categories = await getCategoriesByProjectId(projectId);

        // Pass categories along with the project to your view
        res.render('project', { 
            title: project.title, 
            project, 
            categories 
        });
    } catch (error) {
        console.error("Error loading project details:", error);
        res.status(500).render('error', { title: 'Error', error });
    }
};