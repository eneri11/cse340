/* ******************************************
 * Server.js - Primary file of the application
 ********************************************/

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
    const title = 'Our Partner Organizations';
    res.render('organizations', { title });
});

app.get('/projects', async (req, res) => {
    const title = 'Service Projects';
    res.render('projects', { title });
});

app.get('/categories', async (req, res) => {
    const title = 'Service Project Categories';
    res.render('categories', { title });
});

// ---- Server Listener ----
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});