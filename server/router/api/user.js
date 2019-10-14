const express = require('express');
const userService = require('../../integration/user-services');
const router = express.Router();

/**
 * POST: Add recipe to the database
 */
router.post('/', async (req, res) => {
  try {
    await userService.submitUser(req.body)
    return res.status(201).json({
      message: 'Account successfully created!'
    });
  } catch (err) {
      return res.sendStatus(500);
  }
});

module.exports = router;