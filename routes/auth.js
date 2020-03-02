const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

router.post('/signup', ctrl.auth.signup);
router.post('/login', ctrl.auth.login);
router.get('/verify', ctrl.auth.verify);
router.get('/logout', ctrl.auth.logout);

module.exports = router;
