import express from 'express';
import { requireAccessToken } from '../../middlewares/require-acces-token.middleware.js';
import { UsersController } from '../controllers/users.controller.js';

const usersRouter = express.Router();
const usersController = new UsersController();

// 내 정보 조회
usersRouter.get('/me', requireAccessToken, usersController.getMe);

export { usersRouter };
