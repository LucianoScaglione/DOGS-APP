const express = require('express');
const router = express.Router();
const AuthControllers = require('../controllers/Auth');

router.post('/register', AuthControllers.authRegister);
router.post('/login', AuthControllers.authLogin);

module.exports = router;