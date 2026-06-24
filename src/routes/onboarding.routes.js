/**
 * Routes: Onboarding
 * Mounted at: /rest/onboardings
 *
 * POST /rest/onboardings/register  — public
 * POST /rest/onboardings/login     — public
 * POST /rest/onboardings/logout    — requires authentication
 */

const express = require('express');
const router = express.Router();

const authenticate = require('../middlewares/authenticate.middleware');
const { registerUserController } = require('../controllers/register-user.controller');
const { loginUserController } = require('../controllers/login-user.controller');
const { logoutUserController } = require('../controllers/logout-user.controller');

// Public routes
router.post('/register', registerUserController);
router.post('/login', loginUserController);

// Protected route — must be logged in to log out
router.post('/logout', authenticate, logoutUserController);

module.exports = router;
