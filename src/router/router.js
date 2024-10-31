import express from 'express';

const router = express.Router();

router.use('/goods', goodsRouter);

export default router;
