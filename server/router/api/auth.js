const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('../../config');
const router = express.Router();
const userService = require('../../integration/user-services');
const {
    validationResult
} = require('express-validator');


router.get('/', async (req, res) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
        return res.status(400).json("Validation error");
    }

    let username = req.query.username;
    let password = req.query.password;

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
            name: this.username,
        });
    } catch (err) {
        if (!(err instanceof Error)) {
            return res.status(500);
        }
    }
})

module.exports = router;