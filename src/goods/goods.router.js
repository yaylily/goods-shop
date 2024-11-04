import express from 'express';
import { GoodsController } from './goods.controller.js';
import { createGoodsValidator } from '../middlewares/validators/create-goods-validator.middleware.js';

const goodsRouter = express.Router();
const goodsController = new GoodsController();

// 굿즈 생성
goodsRouter.post('/', createGoodsValidator, goodsController.createGoods);

// 굿즈 목록 조회
goodsRouter.get('/', goodsController.getGoodsList);

// 굿즈 상세 조회
goodsRouter.get('/:goodsId', goodsController.getGoodsDetail);

// 굿즈 수정

//굿즈 삭제

export { goodsRouter };
