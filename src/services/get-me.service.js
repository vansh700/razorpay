/**
 * Service: Get Me
 * Retrieves the profile of the currently logged-in user.
 */

const userRepository = require('../repositories/user.repository');

/**
 * @param {string} userId - User ID
 * @returns {Promise<{ id: string, name: string, email: string, role: string, createdAt: Date }>}
 */
async function getMeService(userId) {
  const user = await userRepository.findById(userId);
  if (!user) {
    const error = new Error('User not found');
    error.statusCode = 404;
    throw error;
  }
  return user;
}

module.exports = getMeService;
