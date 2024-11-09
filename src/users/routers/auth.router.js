import express from 'express';
import { AuthController } from '../controllers/auth.controller.js';
import { signUpDTO } from '../dtos/sign-up.dto.js';

const authRouter = express.Router();
const authController = new AuthController();

// 회원 가입
authRouter.post('/sign-up', signUpDTO, authController.signUp);

// 로그인

// 로그아웃

// 토큰 재발급

export { authRouter };
