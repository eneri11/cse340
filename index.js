/* ******************************************
 * Server.js - Primary file of the application
 ********************************************/
import 'dotenv/config'; // Must be at the very top of your main entry file
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { testConnection } from './src/models/db.js';
import router from './src/routes.js';

testConnection();

const app = express();
const port = process.env.PORT || 5500;
const NODE_ENV = process.env.NODE_ENV;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ---- Static Files Middleware (Crucial for CSS styling!) ----
app.use(express.static(path.join(__dirname, 'public')));

// ---- View Engine and Templates Setup ----
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));

// Step 1: Middleware to log all incoming requests
app.use((req, res, next) => {
    if (NODE_ENV === 'development') {
        console.log(`${req.method} ${req.url}`);
    }
    next(); 
});

// Step 2: Middleware to make NODE_ENV available to all templates
app.use((req, res, next) => {
    res.locals.NODE_ENV = NODE_ENV;
    next();
});

// Use the imported router to handle all application routes
app.use(router);

// Catch-all route for handling 404 errors
app.use((req, res, next) => {  
  const err = new Error('Page Not Found');
  err.status = 404;
  next(err);
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Error occurred:', err.message);
    console.error('Stack trace:', err.stack);

    const status = err.status || 500;
    const template = status === 404 ? '404' : '500'; // Looks for 404.ejs and 500.ejs directly in views

    const context = {
        title: status === 404 ? 'Page Not Found' : 'Server Error',
        error: err.message,
        stack: err.stack,
        NODE_ENV: process.env.NODE_ENV
    };

    res.status(status).render(`errors/${template}`, context);
});

// ---- Server Listener ----
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});