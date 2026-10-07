import express from 'express';

import { showHomePage } from './controllers/home.js';

import {
    showRegisterPage,
    processRegister,
    showLoginPage,
    processLogin,
    logout,
    requireRole,
    requireLogin,
    showUsersPage,
    showDashboardPage
} from './controllers/users.js';

import {
    showOrganizationsPage,
    showOrganizationDetailsPage,
    showNewOrganizationForm,
    processNewOrganizationForm,
    showEditOrganizationForm,
    processEditOrganizationForm
} from './controllers/organizations.js';
import {
    showProjectsPage,
    showProjectDetailsPage,
    showNewProjectForm,
    processNewProjectForm,
    showEditProjectForm,
    processEditProjectForm,
    showUpdateProjectCategories,
    processUpdateProjectCategories,
    processVolunteerSignup,
    processVolunteerRemoval
} from './controllers/projects.js';

import {
    showCategoriesPage,
    showCategoryDetailsPage,
    showNewCategoryForm,
    processNewCategoryForm,
    showEditCategoryForm,
    processEditCategoryForm
} from './controllers/categories.js';

import { testErrorPage } from './controllers/errors.js';

const router = express.Router();

router.get('/health', (req, res) => {
    res.status(200).send('OK');
});

router.get('/', showHomePage);

// Authentication routes
router.get('/register', showRegisterPage);
router.post('/register', processRegister);

router.get('/login', showLoginPage);
router.post('/login', processLogin);

router.get('/logout', logout);

// Dashboard - requires login
router.get(
    '/dashboard',
    requireLogin,
    showDashboardPage
);

// Users page - admin only
router.get(
    '/users',
    requireRole('admin'),
    showUsersPage
);


// Organizations routes
router.get('/organizations', showOrganizationsPage);

// Organizations routes
router.get('/organizations', showOrganizationsPage);
router.get('/organization/:id', showOrganizationDetailsPage);

router.get(
    '/new-organization',
    requireRole('admin'),
    showNewOrganizationForm
);

router.post(
    '/new-organization',
    requireRole('admin'),
    processNewOrganizationForm
);

router.get(
    '/edit-organization/:id',
    requireRole('admin'),
    showEditOrganizationForm
);

router.post(
    '/edit-organization/:id',
    requireRole('admin'),
    processEditOrganizationForm
);

// Projects routes
router.get('/projects', showProjectsPage);
router.get('/project/:id', showProjectDetailsPage);

// Volunteer routes - logged-in users only
router.post(
    '/project/:id/volunteer',
    requireLogin,
    processVolunteerSignup
);

router.post(
    '/project/:id/volunteer/remove',
    requireLogin,
    processVolunteerRemoval
);

router.get(
    '/new-project',
    requireRole('admin'),
    showNewProjectForm
);

router.post(
    '/new-project',
    requireRole('admin'),
    processNewProjectForm
);

router.get(
    '/edit-project/:id',
    requireRole('admin'),
    showEditProjectForm
);

router.post(
    '/edit-project/:id',
    requireRole('admin'),
    processEditProjectForm
);

router.get(
    '/project/:id/categories',
    requireRole('admin'),
    showUpdateProjectCategories
);

router.post(
    '/project/:id/categories',
    requireRole('admin'),
    processUpdateProjectCategories
);

// Categories routes
router.get('/categories', showCategoriesPage);

router.get(
    '/category/:id',
    showCategoryDetailsPage
);

router.get(
    '/new-category',
    requireRole('admin'),
    showNewCategoryForm
);

router.post(
    '/new-category',
    requireRole('admin'),
    processNewCategoryForm
);

router.get(
    '/edit-category/:id',
    requireRole('admin'),
    showEditCategoryForm
);

router.post(
    '/edit-category/:id',
    requireRole('admin'),
    processEditCategoryForm
);

// Error testing route
router.get('/test-error', testErrorPage);

export default router;