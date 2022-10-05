const express = require('express');
const router = express.Router();
const UsersControllers = require('../controllers/Users');

router.get('/', UsersControllers.findAllUsers);

module.exports = router;