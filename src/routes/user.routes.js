const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  getProfile,
  updateProfile,
  getUserArticles
} = require('../controllers/user.controller');

router.get('/profile', auth, getProfile);
router.put('/profile', auth, updateProfile);
router.get('/:userId/articles', getUserArticles);

module.exports = router;