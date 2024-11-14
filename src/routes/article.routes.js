const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  createArticle,
  getAllArticles,
  getArticle,
  updateArticle,
  deleteArticle
} = require('../controllers/article.controller');

router.post('/', auth, createArticle);
router.get('/', getAllArticles);
router.get('/:id', getArticle);
router.put('/:id', auth, updateArticle);
router.delete('/:id', auth, deleteArticle);

module.exports = router;