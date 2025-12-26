const express = require('express');
const router = express.Router();
const authController = require('../Controllers/authController');
const authenticateToken = require('../Middleware/authMiddleware');

const upload = require('../Middleware/uploadMiddleware');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/me', authenticateToken, authController.getMe);
router.put('/profile', authenticateToken, upload.single('profile_image'), authController.updateProfile);

// Password reset with OTP
router.post('/forgot-password', authController.forgotPassword);
router.post('/verify-otp', authController.verifyOTP);
router.post('/reset-password-otp', authController.resetPasswordWithOTP);

// Google Calendar OAuth
router.get('/google', authenticateToken, authController.googleAuth);
router.get('/google/callback', authController.googleCallback);

module.exports = router;
