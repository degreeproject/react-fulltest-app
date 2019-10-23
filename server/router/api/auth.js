const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('../../config');
const router = express.Router();
const userService = require('../../integration/user-services');

/**
 * GET: Authenticates based on the credentials that got passed in the request. 
 * Also returns a token to the user for future authentications.
 */
router.post('/', async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    let authenticated = null;
    try {
        authenticated = await userService.authenticateUser(username, password);
    } catch (err) {
        if (!(err instanceof Error)) {
            return res.sendStatus(500);
        }
    }
    if (!authenticated) {
        return res.status(401).json({
            message: "Wrong credentials"
        });
    }

    try {
        const token = await jwt.sign({
            user: username,
        }, config.SECRET, {
            expiresIn: '24h'
        });
        return res.status(200).json({
            message: "Successful login",
            access_token: token,
            token_type: 'Bearer',
            name: username,
        });
    } catch (err) {
        if (!(err instanceof Error)) {
            return res.status(500);
        }
    }
})

module.exports = router;