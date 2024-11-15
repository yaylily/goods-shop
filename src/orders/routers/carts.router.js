import express from 'express';
import { CartsController } from '../controllers/carts.controller.js';
import { requireToken } from '../../middlewares/require-token.middleware.js';
import { CreateCartItemDTO } from '../dtos/create-cart-item.dto.js';
import { UpdateCartItemStockDTO } from '../dtos/update-cart-item-stock.dto.js';

const cartsRouter = express.Router();
const cartsController = new CartsController();

// 장바구니 상품 추가
cartsRouter.post(
  '/goods/:goodsId/goodsOptions/:goodsOptionId',
  requireToken('access'),
  CreateCartItemDTO,
  cartsController.addToCart
);

// 장바구니 상품 조회
cartsRouter.get('/', requireToken('access'), cartsController.getCartItems);

// 장바구니 수량 수정
cartsRouter.put(
  '/:cartItemId',
  requireToken('access'),
  UpdateCartItemStockDTO,
  cartsController.updateQuantity
);

// 장바구니 상품 삭제
cartsRouter.delete(
  '/:cartItemId',
  requireToken('access'),
  cartsController.deleteCartItem
);

export { cartsRouter };
