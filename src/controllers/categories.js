import { getAllCategories, getCategoryById, getProjectsByCategoryId } from '../models/categories.js';

export const showCategoriesPage = async (req, res, next) => {
  try {
    const categories = await getAllCategories();
    res.render('categories', { title: 'Categories', categories });
  } catch (error) {
    next(error);
  }
};

export const showCategoryDetailsPage = async (req, res, next) => {
  try {
    const categoryId = req.params.id;
    const category = await getCategoryById(categoryId);

    if (!category) {
      return res.status(404).render('404', { title: 'Category Not Found' });
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
}