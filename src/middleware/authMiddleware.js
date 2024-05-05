const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new Error('Invalid authorization header');
        }
        const token = authHeader.substring(7);

        const decoded = jwt.verify(token, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MzZkMmU1ZDYyMmQxZGEwZTZkYzBkMiIsImlhdCI6MTcxNDg2OTE1MywiZXhwIjoxNzE0ODcyNzUzfQ.Hm8vGpyL5vJLR_rs2OvTNWoI0PGhZxEfWNCAYX-BwhM');
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

        if (!user) {
            throw new Error('User not found');
        }

        req.user = user;
        req.token = token;
        // Send the user information as a response
        res.status(200).json({ user, token });
    } catch (error) {
        res.status(401).json({ error: 'Please authenticate' });
    }
};

module.exports = authMiddleware;