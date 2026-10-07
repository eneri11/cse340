import {
    createUser,
    findUserByEmail,
    verifyPassword,
    getAllUsers
} from '../models/users.js';

import { getVolunteerProjects } from '../models/volunteers.js';


// Show the registration page
export const showRegisterPage = (req, res) => {
    res.render('register', {
        title: 'Register'
    });
};


// Process the registration form
export const processRegister = async (req, res, next) => {
    try {
        const {
            name,
            email,
            password,
            confirm_password
        } = req.body;

        // Server-side validation
        if (!name || !email || !password || !confirm_password) {
            req.flash('error', 'All fields are required.');
            return res.redirect('/register');
        }

        if (password !== confirm_password) {
            req.flash('error', 'Passwords do not match.');
            return res.redirect('/register');
        }

        // Check whether the email already exists
        const existingUser = await findUserByEmail(email);

        if (existingUser) {
            req.flash('error', 'An account with that email already exists.');
            return res.redirect('/register');
        }

        const user = await createUser(
            name,
            email,
            password
        );

        req.flash(
            'success',
            'Registration successful! You can now log in.'
        );

        res.redirect('/login');

    } catch (error) {
        next(error);
    }
};


// Show the login page
export const showLoginPage = (req, res) => {
    res.render('login', {
        title: 'Login'
    });
};


// Process the login form
export const processLogin = async (req, res, next) => {
    try {
        const {
            email,
            password
        } = req.body;

        if (!email || !password) {
            req.flash('error', 'Email and password are required.');
            return res.redirect('/login');
        }

        const user = await findUserByEmail(email);

        if (!user) {
            req.flash('error', 'Invalid email or password.');
            return res.redirect('/login');
        }

        const passwordMatches = await verifyPassword(
            password,
            user.password_hash
        );

        if (!passwordMatches) {
            req.flash('error', 'Invalid email or password.');
            return res.redirect('/login');
        }

        // Store only the information we need in the session.
        // Do not store the password hash in the session.
        req.session.user = {
            user_id: user.user_id,
            name: user.name,
            email: user.email,
            role_name: user.role_name
        };

        req.flash(
            'success',
            'Login successful!'
        );

        res.redirect('/');

    } catch (error) {
        next(error);
    }
};


// Log the user out
export const logout = (req, res, next) => {
    req.session.destroy(error => {
        if (error) {
            return next(error);
        }

        res.redirect('/login');
    });
};


// Middleware factory to require a specific role
export const requireRole = (role) => {
    return (req, res, next) => {
        // Check if the user is logged in
        if (!req.session || !req.session.user) {
            req.flash(
                'error',
                'You must be logged in to access this page.'
            );

            return res.redirect('/login');
        }

        // Check if the user's role matches the required role
        if (req.session.user.role_name !== role) {
            req.flash(
                'error',
                'You do not have permission to access this page.'
            );

            return res.redirect('/');
        }

        // User has the required role
        next();
    };
};


// Middleware to require a logged-in user
export const requireLogin = (req, res, next) => {
    if (!req.session || !req.session.user) {
        req.flash(
            'error',
            'You must be logged in to access this page.'
        );

        return res.redirect('/login');
    }

    next();
};

// Show the list of all registered users
export const showUsersPage = async (req, res, next) => {
    try {
        const users = await getAllUsers();

        res.render('users', {
            title: 'Registered Users',
            users
        });
    } catch (error) {
        next(error);
    }
};

// Show the user dashboard
export const showDashboardPage = async (req, res, next) => {
    try {
        const volunteerProjects = await getVolunteerProjects(
            req.session.user.user_id
        );

        res.render('dashboard', {
            title: 'Dashboard',
            volunteerProjects
        });
    } catch (error) {
        next(error);
    }
};