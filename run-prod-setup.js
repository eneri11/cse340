import 'dotenv/config';
import db from './src/models/db.js';

const runCategorySetup = async () => {
  try {
    console.log('Creating category tables on production database...');
    
    await db.query(`
      CREATE TABLE IF NOT EXISTS public.category (
          category_id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL UNIQUE
      );
      
      CREATE TABLE IF NOT EXISTS public.project_category (
          project_id INT NOT NULL,
          category_id INT NOT NULL,
          PRIMARY KEY (project_id, category_id)
      );

      INSERT INTO public.category (category_id, name)
      VALUES 
      (1, 'Environment & Conservation'),
      (2, 'Community Welfare & Health'),
      (3, 'Education & Technology')
      ON CONFLICT (category_id) DO NOTHING;
    `);

    console.log('Category tables and seed data created successfully on production!');
    process.exit(0);
  } catch (err) {
    console.error('Error setting up categories:', err);
    process.exit(1);
  }
};

runCategorySetup();