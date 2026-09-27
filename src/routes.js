import express from 'express';
import { showHomePage } from './controllers/home.js';
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
    showEditProjectForm,
    processEditProjectForm,
    showUpdateProjectCategories,
    processUpdateProjectCategories
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


// Organizations routes
router.get('/organizations', showOrganizationsPage);
router.get('/organization/:id', showOrganizationDetailsPage);

router.get('/new-organization', showNewOrganizationForm);
router.post('/new-organization', processNewOrganizationForm);

router.get('/edit-organization/:id', showEditOrganizationForm);
router.post('/edit-organization/:id', processEditOrganizationForm); // Note: check singular/plural conventions if needed

// Projects routes
router.get('/projects', showProjectsPage);
router.get('/project/:id', showProjectDetailsPage);
router.get('/edit-project/:id', showEditProjectForm);
router.post('/edit-project/:id', processEditProjectForm);

router.get('/project/:id/categories', showUpdateProjectCategories);
router.post('/project/:id/categories', processUpdateProjectCategories);

// Categories routes
router.get('/categories', showCategoriesPage);
router.get('/category/:id', showCategoryDetailsPage);

router.get('/new-category', showNewCategoryForm);
router.post('/new-category', processNewCategoryForm);

router.get('/edit-category/:id', showEditCategoryForm);
router.post('/edit-category/:id', processEditCategoryForm);

// Error testing route
router.get('/test-error', testErrorPage);

export default router;