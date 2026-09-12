import db from './src/models/db.js';

async function setupCategories() {
  try {
    console.log('1. Creating category tables...');
    
    // Create category table
    await db.query(`
      CREATE TABLE IF NOT EXISTS public.category (
          category_id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL UNIQUE
      );
    `);

    // Create junction table for many-to-many relationship
    await db.query(`
      CREATE TABLE IF NOT EXISTS public.project_category (
          project_id INT NOT NULL,
          category_id INT NOT NULL,
          PRIMARY KEY (project_id, category_id),
          CONSTRAINT fk_project
              FOREIGN KEY (project_id)
              REFERENCES public.project(project_id)
              ON DELETE CASCADE,
          CONSTRAINT fk_category
              FOREIGN KEY (category_id)
              REFERENCES public.category(category_id)
              ON DELETE CASCADE
      );
    `);

    console.log('2. Inserting sample categories...');
    await db.query(`
      INSERT INTO public.category (category_id, name)
      VALUES 
      (1, 'Environment & Conservation'),
      (2, 'Community Welfare & Health'),
      (3, 'Education & Technology')
      ON CONFLICT (category_id) DO NOTHING;
    `);

    console.log('3. Associating projects with categories...');
    await db.query(`
      INSERT INTO public.project_category (project_id, category_id)
      VALUES 
      -- Environment projects
      (1, 1), (2, 1), (6, 1), (7, 1), (8, 1), (9, 1), (10, 1),
      -- Health / Welfare projects
      (3, 2), (4, 2), (5, 2),
      -- Education & Tech projects
      (11, 3), (12, 3), (13, 3), (14, 3), (15, 3)
      ON CONFLICT DO NOTHING;
    `);

    console.log('Categories database setup completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error during categories setup:', err);
    process.exit(1);
  }
}

setupCategories();