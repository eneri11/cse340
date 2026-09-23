import { getCategoryById, getProjectsByCategoryId } from '../models/categories.js';

// Controller function for the category details page
export async function buildCategoryDetailsView(req, res, next) {
    try {
        const categoryId = req.params.id;
        const category = await getCategoryById(categoryId);
        
        if (!category) {
            return res.status(404).render('404', { title: 'Category Not Found' });
        }

        const projects = await getProjectsByCategoryId(categoryId);

        res.render('category-detail', {
            title: category.category_name,
            category,
            projects,
        });
    } catch (error) {
        console.error("Error loading category details:", error);
        res.status(500).render('error', { title: 'Error', error });
    }
}