import express from 'express';
import { requireToken } from '../../middlewares/require-token.middleware.js';
import { PaymentController } from '../controllers/payment.controller.js';
import { BuyNowDTO } from '../dtos/buy-now.dto.js';

const paymentRouter = express.Router();
const paymentController = new PaymentController();

// 굿즈 장바구니 구매
paymentRouter.post(
  '/carts/checkout',
  requireToken('access'),
  paymentController.purchaseCartItems
);

// 굿즈 바로 구매
paymentRouter.post(
  '/goods/:goodsId/goodsOptions/:goodsOptionId',
  requireToken('access'),
  BuyNowDTO,
  paymentController.buyNow
);

// 구매 목록 조회
paymentRouter.get('/', requireToken('access'), paymentController.getOrderList);

export { paymentRouter };
