const express = require('express');
const router = express.Router();
const DogsControllers = require('../controllers/Dogs');

router.get('/', DogsControllers.findAll);
router.get('/:id', DogsControllers.findOne);
router.post('/', DogsControllers.create);

module.exports = router;