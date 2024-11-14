const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  createComment,
  getArticleComments,
  updateComment,
  deleteComment
} = require('../controllers/comment.controller');

router.post('/', auth, createComment);
router.get('/article/:articleId', getArticleComments);
router.put('/:id', auth, updateComment);
router.delete('/:id', auth, deleteComment);

module.exports = router;