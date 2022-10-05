const express = require('express');
const router = express.Router();
const CommentsControllers = require('../controllers/Comments');

router.get('/:id', CommentsControllers.getCommentsByDog);
router.post('/', CommentsControllers.createComment);

module.exports = router;

