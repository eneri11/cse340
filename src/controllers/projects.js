import { getAllProjects } from '../models/projects.js';

export async function showProjectsPage(req, res, next) {
  try {
    const projects = await getAllProjects();
    res.render('projects', { 
      title: 'Service Projects', 
      projects 
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    next(error); // This safely passes errors to your 500 handler
  }
}

// Controller for individual project details
export async function showProjectDetailsPage(req, res, next) {
    try {
        const projectId = req.params.id;
        const project = await getProjectById(projectId);

        if (!project) {
            return res.status(404).render('404', { title: 'Project Not Found' });
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
}