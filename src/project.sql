-- Drop existing tables if rebuilding (optional)
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS organizations CASCADE;
DROP TABLE IF EXISTS categories CASCADE;

-- 1. Categories Table
CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT
);

-- 2. Organizations Table
CREATE TABLE organizations (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    logo VARCHAR(255)
);

-- 3. Projects Table
CREATE TABLE projects (
    project_id SERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    date DATE,
    location VARCHAR(150),
    organization_id INT REFERENCES organizations(organization_id) ON DELETE CASCADE,
    category_id INT REFERENCES categories(category_id) ON DELETE SET NULL
);

-- Insert sample data
INSERT INTO categories (name, description) VALUES 
('Environment', 'Projects focused on conservation, tree planting, and cleanups.'),
('Education', 'Tutoring, mentoring, and school supply drives.'),
('Community Welfare', 'Food banks, elderly care, and shelter support.');

INSERT INTO organizations (name, description, logo) VALUES 
('GreenEarth Alliance', 'Dedicated to environmental sustainability and reforestation.', '/images/greenearth.png'),
('HopeReach Foundation', 'Empowering youth through education and community outreach.', '/images/hopereach.png');

INSERT INTO projects (title, description, date, location, organization_id, category_id) VALUES 
('Coastal Cleanup Drive', 'Join us to clean up the local shoreline and protect marine life.', '2026-10-15', 'Manila Bay', 1, 1),
('Weekend Youth Tutoring', 'Provide math and reading support to underprivileged children.', '2026-10-20', 'Community Center', 2, 2);

SELECT * FROM categories;