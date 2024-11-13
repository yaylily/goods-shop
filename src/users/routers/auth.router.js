import express from 'express';
import { AuthController } from '../controllers/auth.controller.js';
import { signUpDTO } from '../dtos/sign-up.dto.js';
import { signInDTO } from '../dtos/sign-in.dto.js';
import { requireToken } from '../../middlewares/require-token.middleware.js';

const authRouter = express.Router();
const authController = new AuthController();

// 회원 가입
authRouter.post('/sign-up', signUpDTO, authController.signUp);

// 로그인
authRouter.post('/sign-in', signInDTO, authController.signIn);

// 토큰 재발급
authRouter.post(
  '/tokens',
  requireToken('refresh'),
  authController.refreshToken
);

// 로그아웃
authRouter.post('/sign-out', requireToken('refresh'), authController.signOut);

export { authRouter };
