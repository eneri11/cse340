/* ******************************************
 * Server.js - Primary file of the application
 ********************************************/
import { getAllOrganizations } from './src/models/organizations.js';
import { getAllProjects } from './src/models/projects.js';
import { getAllCategories } from './src/models/categories.js';

import db from './src/models/db.js';

// Auto-ensure category tables exist on server start (safe to run multiple times)
async function ensureTablesExist() {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS public.category (
          category_id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL UNIQUE
      );
      CREATE TABLE IF NOT EXISTS public.project_category (
          project_id INT NOT NULL,
          category_id INT NOT NULL,
          PRIMARY KEY (project_id, category_id)
      );
      INSERT INTO public.category (category_id, name)
      VALUES 
      (1, 'Environment & Conservation'),
      (2, 'Community Welfare & Health'),
      (3, 'Education & Technology')
      ON CONFLICT (category_id) DO NOTHING;
    `);
    console.log('Database tables verified/created successfully.');
  } catch (err) {
    console.error('Error auto-creating tables:', err);
  }
}

ensureTablesExist();

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
  try {
    const categories = await getAllCategories();
    const title = 'Service Project Categories';
    
    console.log('Fetched categories:', categories); // Optional verification log

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