const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  toggleLike,
  getUserLikes
} = require('../controllers/like.controller');

router.post('/toggle', auth, toggleLike);
router.get('/user', auth, getUserLikes);

module.exports = router;