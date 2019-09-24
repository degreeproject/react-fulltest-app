const express = require('express');
const userservice = require('../../integration/user-services');
const router = express.Router();

/**
 * GET: a single users basic information
 */
router.get('/', async (req, res) => {
      const users = await userservice.getUsers();
      return res.json(users);
    });

module.exports = router;