const express = require('express');
const { getProfile, updateProfile } = require('../controllers/profileController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/profile', auth, getProfile);
router.patch('/profile', auth, updateProfile);

module.exports = router;