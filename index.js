/* ******************************************
 * Server.js - Primary file of the application
 ********************************************/
import { getAllOrganizations } from './src/models/organizations.js';
import { getAllProjects } from './src/models/projects.js';

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = process.env.PORT || 5500;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ---- Static Files Middleware (Required for CSS & Images) ----
app.use(express.static(path.join(__dirname, "public")));

// ---- View Engine and Templates Setup ----
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));

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

app.get('/projects', async (req, res) => {
  try {
    const projects = await getAllProjects();
    const title = 'Service Projects';
    
    // Step 6.2: Log to console to verify it works
    console.log('Fetched projects:', projects);

    // Render the EJS view and send both title and projects data
    res.render('projects', { title, projects });
  } catch (err) {
    console.error('Error fetching projects:', err);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/categories', async (req, res) => {
    const title = 'Service Project Categories';
    res.render('categories', { title });
});

// ---- Server Listener ----
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});