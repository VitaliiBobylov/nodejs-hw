import { Router } from 'express';
import { celebrate } from 'celebrate';

import {
  registerUser,
  loginUser,
  logoutUser,
  refreshUserSession,
} from '../controllers/authController.js';

import {
  registerUserSchema,
  loginUserSchema,
} from '../validations/authValidation.js';

const router = Router();

// POST /auth/register
router.post('/auth/register', celebrate(registerUserSchema), registerUser);

// POST /auth/login
router.post('/auth/login', celebrate(loginUserSchema), loginUser);

// POST /auth/logout
router.post('/auth/logout', logoutUser);

// POST /auth/refresh
router.post('/auth/refresh', refreshUserSession);

export default router;
