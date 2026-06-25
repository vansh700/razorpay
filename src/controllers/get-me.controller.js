/**
 * Controller: Get Me
 * GET /rest/onboardings/me
 *
 * Flow: get userId from req.user → call getMeService → return user data.
 * If user is not found, clear the cookie and return 401.
 */

const getMeService = require('../services/get-me.service');

async function getMeController(req, res, next) {
  try {
    // 1. req.user is set by authenticate middleware
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({
        status: 'error',
        message: 'Unauthorized',
      });
    }

    // 2. Call service to fetch user details
    const user = await getMeService(userId);

    // 3. Return user profile info
    return res.status(200).json({
      status: 'success',
      data: user,
    });
  } catch (err) {
    // If user is not found in database, clear their session cookie
    if (err.statusCode === 404) {
      res.clearCookie('auth_token', {
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
      });
      return res.status(401).json({
        status: 'error',
        message: 'User session not found or invalid.',
      });
    }
    next(err);
  }
}

module.exports = { getMeController };
