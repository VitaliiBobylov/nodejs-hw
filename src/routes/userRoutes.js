import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/multer.js';
import { updateUserAvatar } from '../controllers/userController.js';


const router = Router();

// PATCH /users/me/avatar
router.patch(
  '/users/me/avatar',
  authMiddleware,
  upload.single('avatar'),
  updateUserAvatar
);

export default router;
