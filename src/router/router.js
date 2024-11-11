import express from 'express';
import { goodsRouter } from '../goods/goods.router.js';
import { authRouter } from '../users/routers/auth.router.js';
import { usersRouter } from '../users/routers/users.router.js';

const apiRouter = express.Router();

apiRouter.use('/goods', goodsRouter);
apiRouter.use('/auth', authRouter);
apiRouter.use('/users', usersRouter);

export default apiRouter;
