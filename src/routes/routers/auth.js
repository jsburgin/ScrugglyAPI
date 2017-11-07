const express = require('express');
const passport = require('passport');
const tokens = require('../../middleware/tokens');

const router = express.Router();

router.get('/google/login', passport.authenticate('google', { scope: ['profile'] }));
router.get('/google/callback', passport.authenticate('google', { session: false }), tokens.sendAuthToken);

module.exports = router;