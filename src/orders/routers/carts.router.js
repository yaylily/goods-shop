import express from 'express';
import { CartsController } from '../controllers/carts.controller.js';
import { requireToken } from '../../middlewares/require-token.middleware.js';
import { createCartItemDTO } from '../dtos/create-cart-item.dto.js';

const cartsRouter = express.Router();
const cartsController = new CartsController();

// 장바구니 상품 추가
cartsRouter.post(
  '/goods/:goodsId/goodsOptions/:goodsOptionId',
  requireToken('access'),
  createCartItemDTO,
  cartsController.addToCart
);

// 장바구니 상품 조회
cartsRouter.get('/', requireToken('access'), cartsController.getCartItems);

export { cartsRouter };
