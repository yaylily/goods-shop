import express from 'express';
import { goodsRouter } from '../goods/goods.router.js';

const apiRouter = express.Router();

apiRouter.use('/goods', goodsRouter);

export default apiRouter;
