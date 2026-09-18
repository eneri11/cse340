import { getUpcomingProjects, getProjectDetails } from '../models/projects.js';

const NUMBER_OF_UPCOMING_PROJECTS = 5;

export async function showProjectsPage(req, res) {
  try {
    const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
    res.render('projects', { title: "Upcoming Service Projects", projects });
  } catch (err) {
    console.error("Error loading projects page:", err);
    res.status(500).send("Error loading projects page");
  }
}

export async function showProjectDetailsPage(req, res) {
  try {
    const projectId = req.params.id;
    const project = await getProjectDetails(projectId);
    res.render('project', { title: project.title, project });
  } catch (err) {
    console.error("Error loading project details page:", err);
    res.status(500).send("Error loading project details page");
  }
}