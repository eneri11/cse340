import db from './src/models/db.js';

async function runFullSetup() {
  try {
    console.log('1. Creating tables...');
    
    // Create organization table
    await db.query(`
      CREATE TABLE IF NOT EXISTS public.organization (
          organization_id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          description TEXT,
          contact_email VARCHAR(255),
          logo_filename VARCHAR(255)
      );
    `);

    // Create project table
    await db.query(`
      CREATE TABLE IF NOT EXISTS public.project (
          project_id SERIAL PRIMARY KEY,
          organization_id INT NOT NULL,
          title VARCHAR(255) NOT NULL,
          description TEXT,
          location VARCHAR(255),
          date DATE,
          CONSTRAINT fk_organization
              FOREIGN KEY (organization_id)
              REFERENCES public.organization(organization_id)
              ON DELETE CASCADE
      );
    `);

    console.log('2. Inserting organizations...');
    await db.query(`
      INSERT INTO public.organization (organization_id, name, description, contact_email, logo_filename)
      VALUES 
      (1, 'Manila Chamber of Commerce', 'Supporting local businesses and community development.', 'contact@manilachamber.org', 'manila-logo.png'),
      (2, 'Akyat-Tanaw Hiking Advocates', 'Promoting environmental conservation and safe hiking trails.', 'info@akyattanaw.org', 'akyattanaw-logo.png'),
      (3, 'CSE Service Network', 'Connecting student developers with community service projects.', 'support@csenetwork.org', 'cse-logo.png')
      ON CONFLICT (organization_id) DO NOTHING;
    `);

    console.log('3. Inserting sample service projects...');
    await db.query(`
      INSERT INTO public.project (organization_id, title, description, location, date)
      VALUES 
      (1, 'Community Tree Planting', 'Planting native trees along the riverbank.', 'Manila', '2026-10-05'),
      (1, 'Coastal Cleanup Drive', 'Collecting plastic waste from the shorelines.', 'Cavite', '2026-10-12'),
      (1, 'Food Bank Distribution', 'Packing and distributing meals to families in need.', 'Quezon City', '2026-10-19'),
      (1, 'Neighborhood Literacy Program', 'Reading to children and distributing books.', 'Manila', '2026-10-26'),
      (1, 'Health and Wellness Fair', 'Providing basic checkups and health counseling.', 'Pasay', '2026-11-02'),

      (2, 'Urban Garden Workshop', 'Teaching locals how to set up small-scale vegetable gardens.', 'Makati', '2026-10-06'),
      (2, 'Recycling Awareness Drive', 'Educating schools on proper waste segregation.', 'Taguig', '2026-10-13'),
      (2, 'Solar Lamp Assembly', 'Building portable solar lights for off-grid communities.', 'Rizal', '2026-10-20'),
      (2, 'Water Filtration Training', 'Demonstrating low-cost water filter maintenance.', 'Laguna', '2026-10-27'),
      (2, 'Composting Seminar', 'Hands-on session on organic waste composting.', 'Mandaluyong', '2026-11-03'),

      (3, 'Youth Coding Bootcamp', 'Introduction to basic web development for teens.', 'Quezon City', '2026-10-07'),
      (3, 'Digital Literacy for Seniors', 'Helping senior citizens learn smartphone and internet basics.', 'San Juan', '2026-10-14'),
      (3, 'Library Book Drive', 'Sorting and cataloging donated books for local libraries.', 'Manila', '2026-10-21'),
      (3, 'Tech Career Mentorship', 'One-on-one resume reviews and career chats.', 'Pasig', '2026-10-28'),
      (3, 'Open Source Hardware Workshop', 'Building simple automated sensors using microcontrollers.', 'Marikina', '2026-11-04')
      ON CONFLICT DO NOTHING;
    `);

    console.log('Full database setup completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error during full setup:', err);
    process.exit(1);
  }
}

runFullSetup();