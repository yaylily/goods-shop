import express from 'express';
import { requireToken } from '../../middlewares/require-token.middleware.js';
import { PaymentController } from '../controllers/payment.controller.js';

const paymentRouter = express.Router();
const paymentController = new PaymentController();

// 굿즈 장바구니 구매
paymentRouter.post(
  '/carts/checkout',
  requireToken('access'),
  paymentController.purchaseCartItems
);

export { paymentRouter };
