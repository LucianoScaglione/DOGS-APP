const express = require('express');
const router = express.Router();
const TemperamentsControllers = require('../controllers/Temperaments');

router.get('/', TemperamentsControllers.allTemperaments);

module.exports = router;