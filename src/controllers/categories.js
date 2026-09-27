import {
    getAllCategories,
    getCategoryById,
    getProjectsByCategoryId,
    createCategory,
    updateCategory
} from '../models/categories.js';

// Show all categories
export const showCategoriesPage = async (req, res, next) => {
    try {
        const categories = await getAllCategories();

        res.render('categories', {
            title: 'Categories',
            categories
        });
    } catch (error) {
        next(error);
    }
};

// Show category details
export const showCategoryDetailsPage = async (req, res, next) => {
    try {
        const categoryId = req.params.id;

        const category = await getCategoryById(categoryId);

        if (!category) {
            return res.status(404).render('errors/404', {
                title: 'Category Not Found'
            });
        }

        const projects = await getProjectsByCategoryId(categoryId);

        res.render('category-detail', {
            title: category.name,
            category,
            projects
        });
    } catch (error) {
        next(error);
    }
};

// Show the new category form
export const showNewCategoryForm = (req, res) => {
    res.render('new-category', {
        title: 'New Category'
    });
};

// Process the new category form
export const processNewCategoryForm = async (req, res, next) => {
    try {
        const { name } = req.body;

        await createCategory(name);

        req.flash('success', 'Category created successfully!');

        res.redirect('/categories');
        } catch (error) {
        req.flash('error', error.message);
        req.flash('categoryName', req.body.name || '');

        res.redirect('/new-category');
    }
};

// Show the edit category form
export const showEditCategoryForm = async (req, res, next) => {
    try {
        const categoryId = req.params.id;

        const category = await getCategoryById(categoryId);

        if (!category) {
            return res.status(404).render('errors/404', {
                title: 'Category Not Found'
            });
        }

        res.render('edit-category', {
            title: `Edit ${category.name}`,
            category
        });
    } catch (error) {
        next(error);
    }
};

// Process the edit category form
export const processEditCategoryForm = async (req, res, next) => {
    try {
        const categoryId = req.params.id;
        const { name } = req.body;

        await updateCategory(categoryId, name);

        req.flash('success', 'Category updated successfully!');

        res.redirect(`/category/${categoryId}`);
    } catch (error) {
        req.flash('error', error.message);

        res.redirect(`/edit-category/${req.params.id}`);
    }
};