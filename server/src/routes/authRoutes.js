import { Router } from 'express';
import { authController } from '../controllers/authController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = Router();

// Public Authentication Endpoints
router.post('/login', authController.login);
router.post('/demo-login', authController.demoLogin);
router.post('/register', authController.register);
router.post('/google', authController.googleAuth);
router.post('/refresh', authController.refreshToken);

// Protected Authentication Profile
router.get('/me', authenticate, authController.getMe);

export default router;
