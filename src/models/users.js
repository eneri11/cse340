import bcrypt from 'bcrypt';
import db from './db.js';

// Create a new user
export const createUser = async (name, email, password) => {
    if (!name || name.trim().length === 0) {
        throw new Error('Name is required.');
    }

    if (!email || email.trim().length === 0) {
        throw new Error('Email is required.');
    }

    if (!password || password.length === 0) {
        throw new Error('Password is required.');
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const { rows } = await db.query(
        `INSERT INTO users (name, email, password_hash, role_id)
         VALUES (
             $1,
             $2,
             $3,
             (SELECT role_id FROM roles WHERE role_name = 'user')
         )
         RETURNING user_id, name, email, role_id;`,
        [
            name.trim(),
            email.trim().toLowerCase(),
            passwordHash
        ]
    );

    return rows[0];
};


// Find a user by email
export const findUserByEmail = async (email) => {
    const query = `
        SELECT
            u.user_id,
            u.name,
            u.email,
            u.password_hash,
            r.role_name
        FROM users u
        JOIN roles r
            ON u.role_id = r.role_id
        WHERE u.email = $1
    `;

    const { rows } = await db.query(
        query,
        [email.trim().toLowerCase()]
    );

    return rows[0];
};


// Check a password against the stored password hash
export const verifyPassword = async (password, passwordHash) => {
    return await bcrypt.compare(password, passwordHash);
};

// Get all registered users with their roles
export const getAllUsers = async () => {
    const query = `
        SELECT
            u.user_id,
            u.name,
            u.email,
            r.role_name
        FROM users u
        JOIN roles r
            ON u.role_id = r.role_id
        ORDER BY u.name ASC;
    `;

    const { rows } = await db.query(query);

    return rows;
};