import { getAllProjects, getProjectDetails, getCategoriesByProjectId } from '../models/projects.js';

export const showProjectsPage = async (req, res, next) => {
    try {
        const projects = await getAllProjects();
        res.render('projects', { title: 'Service Projects', projects });
    } catch (error) {
        next(error);
    }
};

export const showProjectDetailsPage = async (req, res, next) => {
    try {
        const projectId = req.params.id;
        const project = await getProjectDetails(projectId);
        
        if (!project) {
            return res.status(404).render('404', { title: 'Project Not Found' });
        }

        const categories = await getCategoriesByProjectId(projectId);

        res.render('project', { 
            title: project.title, 
            project, 
            categories 
        });
    } catch (error) {
        next(error);
    }
};