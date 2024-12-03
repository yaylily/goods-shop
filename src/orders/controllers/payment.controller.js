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
      const { address, phone } = req.body;

      const purchasedCartItems = await this.paymentService.purchaseCartItems(
        userId,
        points,
        address,
        phone
      );

      const orderResponseDto = new OrderResponseDto(purchasedCartItems);

      return res.status(HTTP_STATUS.CREATED).json({
        status: HTTP_STATUS.CREATED,
        message: MESSAGES.PAYMENT.PURCHASE_CART_ITEMS.SUCCEED,
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
        message: MESSAGES.PAYMENT.BUY_NOW.SUCCEED,
        data: orderResponseDto,
      });
    } catch (err) {
      next(err);
    }
  };

  // 주문 목록 조회
  getOrderList = async (req, res, next) => {
    try {
      const { userId } = req.user;

      const OrderList = await this.paymentService.getOrderList(userId);

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.PAYMENT.GET_ORDER_LIST.SUCCEED,
        data: OrderList,
      });
    } catch (err) {
      next(err);
    }
  };
}
