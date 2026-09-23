import { getAllProjects, getProjectDetails, getCategoriesByProjectId } from '../models/projects.js';
import { getProjectById, getCategoriesByProjectId } from '../models/projects.js'; // Adjust path as needed

export async function showProjectDetailsPage(req, res, next) {
  try {
    const projectId = req.params.id;
    const project = await getProjectById(projectId);

    if (!project) {
      return res.status(404).render('404', { title: 'Project Not Found' });
    }

    // Fetch categories/tags associated with this project
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