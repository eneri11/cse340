import { getAllCategories, getCategoryById } from '../models/categories.js';

export const showCategoriesPage = async (req, res) => {
    try {
        const categories = await getAllCategories();
        res.render('categories', { title: 'Service Categories', categories });
    } catch (error) {
        console.error("Error loading categories page:", error);
        res.status(500).render('error', { title: 'Error', error });
    }
};

export const showCategoryDetailsPage = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const category = await getCategoryById(categoryId);
        
        if (!category) {
            return res.status(404).render('404', { title: 'Category Not Found' });
        }

        res.render('category-detail', { title: category.name, category });
    } catch (error) {
        console.error("Error loading category details:", error);
        res.status(500).render('error', { title: 'Error', error });
    }
};