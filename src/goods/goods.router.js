import express from 'express';
import { GoodsController } from './goods.controller.js';
import { createGoodsDTO } from './dtos/create-goods.dto.js';
import { updateGoodsDTO } from './dtos/update-goods.dto.js';
import { updateStockDTO } from './dtos/update-stock.dto.js';
import { uploadFields } from '../utils/s3.util.js';
import { requireAccessToken } from '../middlewares/require-acces-token.middleware.js';

const goodsRouter = express.Router();
const goodsController = new GoodsController();

// 굿즈 생성
goodsRouter.post(
  '/',
  requireAccessToken,
  uploadFields,
  createGoodsDTO,
  goodsController.createGoods
);

// 굿즈 목록 조회
goodsRouter.get('/', goodsController.getGoodsList);

// 굿즈 상세 조회
goodsRouter.get('/:goodsId', goodsController.getGoodsDetail);

// 굿즈 수정
goodsRouter.patch(
  '/:goodsId',
  requireAccessToken,
  updateGoodsDTO,
  goodsController.updateGoods
);

// 재고 수정
goodsRouter.patch(
  '/:goodsId/goodsOptions/:goodsOptionId',
  requireAccessToken,
  updateStockDTO,
  goodsController.updateStock
);

//굿즈 삭제
goodsRouter.delete(
  '/:goodsId',
  requireAccessToken,
  goodsController.goodsDelete
);

export { goodsRouter };
