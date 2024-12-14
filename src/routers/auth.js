import express from 'express';
import {
  registerSchema,
  loginSchema,
  sendResetEmailSchema,
  resetPasswordSchema,
} from '../validation/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  loginController,
  logoutController,
  refreshController,
  registerController,
  sendResetEmailController,
  resetPasswordController,
} from '../controllers/auth.js';

const router = express.Router();

const jsonParser = express.json();

router.post(
  '/register',
  jsonParser,
  validateBody(registerSchema),
  ctrlWrapper(registerController),
);

router.post(
  '/login',
  jsonParser,
  validateBody(loginSchema),
  ctrlWrapper(loginController),
);

router.post('/logout', ctrlWrapper(logoutController));

router.post('/refresh', ctrlWrapper(refreshController));

export default router;

router.post(
  '/send-reset-email',
  jsonParser,
  validateBody(sendResetEmailSchema),
  ctrlWrapper(sendResetEmailController),
);

router.post(
  '/reset-pwd',
  jsonParser,
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController),
);
