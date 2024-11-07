import express from 'express';
import { GoodsController } from './goods.controller.js';
import { createGoodsValidator } from '../middlewares/validators/create-goods-validator.middleware.js';
import { updateGoodsValidator } from '../middlewares/validators/update-goods-validator.middleware.js';
import { updateStockValidator } from '../middlewares/validators/update-stock-validator.middleware.js';
import { uploadFields } from '../utils/s3.util.js';

const goodsRouter = express.Router();
const goodsController = new GoodsController();

// 굿즈 생성
goodsRouter.post(
  '/',
  uploadFields,
  createGoodsValidator,
  goodsController.createGoods,
);

// 굿즈 목록 조회
goodsRouter.get('/', goodsController.getGoodsList);

// 굿즈 상세 조회
goodsRouter.get('/:goodsId', goodsController.getGoodsDetail);

// 굿즈 수정
goodsRouter.patch(
  '/:goodsId',
  updateGoodsValidator,
  goodsController.updateGoods,
);

// 재고 수정
goodsRouter.patch(
  '/:goodsId/goodsOptions/:goodsOptionId',
  updateStockValidator,
  goodsController.updateStock,
);

//굿즈 삭제
goodsRouter.delete('/:goodsId', goodsController.goodsDelete);

export { goodsRouter };
