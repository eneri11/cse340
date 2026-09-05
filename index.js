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

// ---- View Engine and Templates Setup (Step 1) ----
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));

// ---- Static Files Middleware ----
app.use(express.static(path.join(__dirname, "public")));

// ---- Routes (Step 4) ----
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