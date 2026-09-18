// Import any needed model functions
import { getAllCategories } from '../models/categories.js';

// Define any controller functions
const showCategoriesPage = async (req, res) => {
    const categories = await getAllCategories();
    const title = 'Service Categories';

    res.render('categories', { title, categories });
};  

// Export any controller functions
export { showCategoriesPage };

async function buildCategoryDetails(req, res, next) {
  const categoryId = req.params.id;
  const category = await categoryModel.getCategoryById(categoryId);
  const projects = await categoryModel.getProjectsByCategoryId(categoryId);

  if (!category) {
    // Trigger your 404 handler if the category doesn't exist
    const err = new Error('Category not found');
    err.status = 404;
    return next(err);
  }

  res.render('category-detail', {
    title: category.category_name,
    category,
    projects
  });
}