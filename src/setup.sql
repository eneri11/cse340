-- ========================================
-- Organization Table
-- ========================================
CREATE TABLE public.organizations (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    contact_email VARCHAR(255),
    logo_filename VARCHAR(255)
);


-- ========================================
-- Insert sample data: Organizations
-- ========================================
INSERT INTO organization (name, description, contact_email, logo_filename) 
VALUES 
('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
('GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
('UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unityserve-logo.png');


-- 1. Create the project table with a foreign key constraint pointing to organization
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

-- 2. Insert sample service projects (assuming organization_ids 1, 2, and 3 exist)
INSERT INTO public.project (organization_id, title, description, location, date)
VALUES 
-- Organization 1 Projects
(1, 'Community Tree Planting', 'Planting native trees along the riverbank.', 'Manila', '2026-10-05'),
(1, 'Coastal Cleanup Drive', 'Collecting plastic waste from the shorelines.', 'Cavite', '2026-10-12'),
(1, 'Food Bank Distribution', 'Packing and distributing meals to families in need.', 'Quezon City', '2026-10-19'),
(1, 'Neighborhood Literacy Program', 'Reading to children and distributing books.', 'Manila', '2026-10-26'),
(1, 'Health and Wellness Fair', 'Providing basic checkups and health counseling.', 'Pasay', '2026-11-02'),

-- Organization 2 Projects
(2, 'Urban Garden Workshop', 'Teaching locals how to set up small-scale vegetable gardens.', 'Makati', '2026-10-06'),
(2, 'Recycling Awareness Drive', 'Educating schools on proper waste segregation.', 'Taguig', '2026-10-13'),
(2, 'Solar Lamp Assembly', 'Building portable solar lights for off-grid communities.', 'Rizal', '2026-10-20'),
(2, 'Water Filtration Training', 'Demonstrating low-cost water filter maintenance.', 'Laguna', '2026-10-27'),
(2, 'Composting Seminar', 'Hands-on session on organic waste composting.', 'Mandaluyong', '2026-11-03'),

-- Organization 3 Projects
(3, 'Youth Coding Bootcamp', 'Introduction to basic web development for teens.', 'Quezon City', '2026-10-07'),
(3, 'Digital Literacy for Seniors', 'Helping senior citizens learn smartphone and internet basics.', 'San Juan', '2026-10-14'),
(3, 'Library Book Drive', 'Sorting and cataloging donated books for local libraries.', 'Manila', '2026-10-21'),
(3, 'Tech Career Mentorship', 'One-on-one resume reviews and career chats.', 'Pasig', '2026-10-28'),
(3, 'Open Source Hardware Workshop', 'Building simple automated sensors using microcontrollers.', 'Marikina', '2026-11-04')
ON CONFLICT DO NOTHING;


-- 3. Create the category table
CREATE TABLE IF NOT EXISTS public.category (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

-- 4 Create the junction table for the many-to-many relationship between projects and categories
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

-- 5. Insert sample categories
INSERT INTO public.category (category_id, name)
VALUES 
(1, 'Environment & Conservation'),
(2, 'Community Welfare & Health'),
(3, 'Education & Technology')
ON CONFLICT (category_id) DO NOTHING;

-- 6. Associate projects with categories
INSERT INTO public.project_category (project_id, category_id)
VALUES 
-- Environment projects
(1, 1), (2, 1), (6, 1), (7, 1), (8, 1), (9, 1), (10, 1),
-- Health / Welfare projects
(3, 2), (4, 2), (5, 2),
-- Education & Tech projects
(11, 3), (12, 3), (13, 3), (14, 3), (15, 3)
ON CONFLICT DO NOTHING;