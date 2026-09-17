/* ******************************************
 * Server.js - Primary file of the application
 ********************************************/
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// 1. Import your models using ES module imports
import { getAllOrganizations } from './src/models/organizations.js';
import { getUpcomingProjects, getProjectDetails } from './src/models/projects.js';
import { getAllCategories } from './src/models/categories.js';

// Note: Ensure your database client is imported correctly if needed here
// import db from './src/services/database.js';

const app = express();
const port = process.env.PORT || 5500;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ---- Static Files Middleware ----
app.use(express.static(path.join(__dirname, "public")));

// ---- View Engine and Templates Setup ----
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));

// ---- Constants ----
const NUMBER_OF_UPCOMING_PROJECTS = 5;

// ---- Routes ----
app.get('/', async (req, res) => {
    const title = 'Home';
    res.render('home', { title });
});

app.get('/organizations', async (req, res) => {
    const organizations = await getAllOrganizations();
    const title = 'Our Partner Organizations';

    res.render('organizations', { title, organizations });
});

// Updated /projects route using getUpcomingProjects and the constant
app.get('/projects', async (req, res) => {
  try {
    const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
    const title = 'Upcoming Service Projects';
    
    res.render('projects', { title, projects });
  } catch (err) {
    console.error('Error fetching upcoming projects:', err);
    // CHANGE THIS LINE TEMPORARILY:
    res.status(500).send(`<pre>${err.stack}</pre>`);
  }
});

// New dynamic route for a single project details page
app.get('/project/:id', async (req, res) => {
  try {
    const projectId = req.params.id;
    const project = await getProjectDetails(projectId);
    
    if (!project) {
      return res.status(404).send('Project not found');
    }

    res.render('project', {
      title: project.title,
      project: project
    });
  } catch (error) {
    console.error('Error fetching project details:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/categories', async (req, res) => {
  try {
    const categories = await getAllCategories();
    const title = 'Service Project Categories';

    res.render('categories', { title, categories });
  } catch (err) {
    console.error('Error fetching categories:', err);
    res.status(500).send('Internal Server Error');
  }
});

// ---- Server Listener ----
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});