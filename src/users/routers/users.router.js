import express from 'express';
import { requireToken } from '../../middlewares/require-token.middleware.js';
import { UsersController } from '../controllers/users.controller.js';
import { userUpdateDTO } from '../dtos/user-update.dto.js';

const usersRouter = express.Router();
const usersController = new UsersController();

// 내 정보 조회
usersRouter.get('/me', requireToken('access'), usersController.getMe);

// 내 정보 수정
usersRouter.patch(
  '/me',
  userUpdateDTO,
  requireToken('access'),
  usersController.updateMe
);

// 포인트 로그 조회
usersRouter.get(
  '/me/pointsLog',
  requireToken('access'),
  usersController.getPointsLog
);

export { usersRouter };
