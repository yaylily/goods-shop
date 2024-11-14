import express from 'express';
import { goodsRouter } from '../goods/goods.router.js';
import { authRouter } from '../users/routers/auth.router.js';
import { usersRouter } from '../users/routers/users.router.js';
import { cartsRouter } from '../orders/routers/carts.router.js';

const apiRouter = express.Router();

apiRouter.use('/goods', goodsRouter);
apiRouter.use('/auth', authRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/carts', cartsRouter);

export default apiRouter;
