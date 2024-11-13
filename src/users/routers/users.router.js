import express from 'express';
import { requireToken } from '../../middlewares/require-token.middleware.js';
import { UsersController } from '../controllers/users.controller.js';

const usersRouter = express.Router();
const usersController = new UsersController();

// 내 정보 조회
usersRouter.get('/me', requireToken('access'), usersController.getMe);

export { usersRouter };
