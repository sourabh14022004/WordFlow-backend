const express = require('express');
const router = express.Router();
const {
  register,
  login,
  verifyEmail,
  requestPasswordReset,
  resetPassword
} = require('../controllers/auth.controller');

router.post('/register', register);
router.post('/login', login);
router.get('/verify/:token', verifyEmail);
router.post('/request-reset', requestPasswordReset);
router.post('/reset-password', resetPassword);

module.exports = router;