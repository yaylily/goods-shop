import express from 'express';
import { goodsRouter } from '../goods/goods.router.js';
import { authRouter } from '../users/routers/auth.router.js';

const apiRouter = express.Router();

apiRouter.use('/goods', goodsRouter);
apiRouter.use('/auth', authRouter);

export default apiRouter;
