/* eslint-disable no-console */
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const config = require('../config');

/**
 * Array of path/method combos that may be accessed without logging in.
 */
const unauthorizedAccessPaths = [
  // Registring a user
  {route: /^\/api\/user$/, method: 'POST'},
  {route: /^\/api\/user\/.*$/, method: 'GET'},
  // Trying to authenticate
  {route: /^\/api\/auth$/, method: 'GET'},
  // Get recipes
  {route: /^\/api\/recipe\/.*$/, method: 'GET'},
  {route: /^\/api\/recipe$/, method: 'GET'},
];

/**
 * Looks to see if the requested path/method combo is permitted
 * without loggin in. Add path/method combos to the permittedAccess
 * array to add more
 * @param {String} path The requested path.
 * @param {String} method The request method.
 * @returns {Boolean} Whether or not the access is permitted.
 */
function loggedOutAccess(route, method) {
  /*
  * Fancy way of "filtering" out a sought for object by its properties,
  * and if such a object exists, it will not be 'undefined'
  * and the function returns true
  // */
  // return unauthorizedAccessPaths.find(ele => (ele.route.match(route) && ele.method === method)) !== undefined;

    // Unsure whether this need to be trimmed. but better to be safe than sorry
    route = route.trim();
    const allowed = unauthorizedAccessPaths.find((ele) => {
      return route.match(ele.route) && method === ele.method;
    }) !== undefined;
    return allowed;
}

/**
 * Authenticates a request by its token.
 * @param {String} token The token proving the user is logged in.
 * @returns {Object} A object containing a {Boolean} success field
 * indicating whether the token was authenticated or not. Also has
 * a message field with more information.
 */
async function authenticateToken(token) {
  return await jwt.verify(token, config.SECRET, (err) => {
    if (err) {
      return {
        success: false,
        message: 'Token is not valid'
      };
    } else {
      return {
        success: true,
        message: 'Token is valid',
      };
    }
  });
}

/**
 * This middleware handles Authentication and Authorization
 * of API endpoint access through the token info (user info)
 */
router.all(/.*/, async (req, res, next) => {
  const route = req.baseUrl;
  const method = req.method;
  // if (process.env.NODE_ENV !== 'production') {
  //   next();
  // }
  if (loggedOutAccess(route, method)) {
    return next();
  }
  let token = req.headers.authorization;
  if (!token)
    return res.status(400).json({message: 'ERROR.TOKEN.NOT_SUPPLIED'});
  if (!token.startsWith('Bearer'))
    return res.status(400).json({message: 'ERROR.TOKEN.INVALID'});
  token = token.replace('Bearer ', '');

  const authAudit = await authenticateToken(token);
  if (!authAudit.success){
    return res.status(401).json({message: authAudit.message});
  }

    try {
      const { username } = await decodeUsername(token);
      req.userUsername = username;
      if (allowedSelfAction(route, method)) {
        return next();
      }
      }catch(err){
        return res.sendStatus(500).json({message: 'You are not allowed to do that'})
      }
  return res.status(401).json({message: 'ERROR.AUTH.UNAUTHORIZED'})
});

// /**
//  * Specified which actions the Recruiters may take
//  * as "ADMINS".
//  */
// const RECRUITER_ACTIONS = [
//   // Getting all applications
//   {route: /^\/api\/application\/all$/, method: 'GET'},
//   // Approving/Denying applications
//   {route: /^\/api\/application\/+\d+(-\d+)*$/, method: 'PATCH'},
//   // Get a specific users application
//   {route: /^\/api\/application\/+\d+(-\d+)*$/, method: 'GET'}
// ]

// /**
//  * Checks to se if the action is allowed for recruiters
//  * @param {String} route The route
//  * @param {String} method Request method
//  */
// function allowedRecruiterAction(route, method) {
//   route = route.trim();
//   const allowed = RECRUITER_ACTIONS.find((action) => {
//     return route.match(action.route) && method === action.method;
//   }) !== undefined;
//   return allowed;
// }

/**
 * Specifies which actions may be taken only by oneself
 */
const SELF_ACTIONS = [
  {route: /^\/api\/recipe$/, method: 'POST'},
  {route: /^\/api\/recipe\/comment$/, method: 'POST'},
  // Means '/api/recipe/12331-12312 (ending in only numbers and dashes)
]

/**
 * Checks to see if the action is allowed for applicants (to perform on themselves)
 * @param {String} route The route
 * @param {String} method Request method
 */
function allowedSelfAction(route, method) {
  // Unsure whether this need to be trimmed. but better to be safe than sorry
  route = route.trim();
  const allowed = SELF_ACTIONS.find((action) => {
    return route.match(action.route) && method === action.method;
  }) !== undefined;
  return allowed;
}
/**
 * Decodes the user token
 * @param {String} token The reqest authrization token
 * @returns {Object} user. With fields 'role' and 'username'
 */
async function decodeUsername(token) {
  try {
    const {user} = await jwt.verify(token, config.SECRET);
    return {username: user};
  } catch (err) {
    throw new Error('Error verifying token');
  }
}

module.exports = router;