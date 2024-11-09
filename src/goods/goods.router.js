import express from 'express';
import { GoodsController } from './goods.controller.js';
import { createGoodsDTO } from './dtos/create-goods.dto.js';
import { updateGoodsDTO } from './dtos/update-goods.dto.js';
import { updateStockDTO } from './dtos/update-stock.dto.js';
import { uploadFields } from '../utils/s3.util.js';

const goodsRouter = express.Router();
const goodsController = new GoodsController();

// 굿즈 생성
goodsRouter.post(
  '/',
  uploadFields,
  createGoodsDTO,
  goodsController.createGoods,
);

// 굿즈 목록 조회
goodsRouter.get('/', goodsController.getGoodsList);

// 굿즈 상세 조회
goodsRouter.get('/:goodsId', goodsController.getGoodsDetail);

// 굿즈 수정
goodsRouter.patch('/:goodsId', updateGoodsDTO, goodsController.updateGoods);

// 재고 수정
goodsRouter.patch(
  '/:goodsId/goodsOptions/:goodsOptionId',
  updateStockDTO,
  goodsController.updateStock,
);

//굿즈 삭제
goodsRouter.delete('/:goodsId', goodsController.goodsDelete);

export { goodsRouter };
