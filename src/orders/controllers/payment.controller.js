import { HTTP_STATUS } from '../../constant/http-status.constant.js';
import { MESSAGES } from '../../constant/message.constant.js';
import { PaymentService } from '../services/payment.service.js';
import { OrderResponseDto } from '../dtos/order.response.dto.js';

export class PaymentController {
  paymentService = new PaymentService();

  // 장바구니 상품 구매
  purchaseCartItems = async (req, res, next) => {
    try {
      const { userId, points } = req.user;

      const purchasedCartItems = await this.paymentService.purchaseCartItems(
        userId,
        points
      );

      const orderResponseDto = new OrderResponseDto(purchasedCartItems);

      return res.status(HTTP_STATUS.CREATED).json({
        status: HTTP_STATUS.CREATED,
        message: MESSAGES.PAYMENT.PURCHASE_CART_ITEMS.SUCCED,
        data: orderResponseDto,
      });
    } catch (err) {
      next(err);
    }
  };

  // 굿즈 바로구매
  buyNow = async (req, res, next) => {
    try {
      const { userId, points } = req.user;
      const { goodsOptionId } = req.params;
      const { quantity } = req.body;

      const purchasedItem = await this.paymentService.buyNow(
        userId,
        points,
        goodsOptionId,
        quantity
      );

      const orderResponseDto = new OrderResponseDto(purchasedItem);

      return res.status(HTTP_STATUS.CREATED).json({
        status: HTTP_STATUS.CREATED,
        message: MESSAGES.PAYMENT.BUY_NOW.SUCCED,
        data: orderResponseDto,
      });
    } catch (err) {
      next(err);
    }
  };
}
