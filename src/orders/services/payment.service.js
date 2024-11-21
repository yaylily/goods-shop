import { MESSAGES } from '../../constant/message.constant.js';
import { HttpError } from '../../errors/http-error.js';
import { PaymentRepository } from '../repositories/payment.repository.js';

export class PaymentService {
  paymentRepository = new PaymentRepository();

  // 장바구니 상품 구매
  purchaseCartItems = async (userId, points) => {
    // 장바구니가 존재하는지 확인
    const cart = await this.paymentRepository.findCartById(userId);

    if (!cart) {
      throw new HttpError.NotFound(
        MESSAGES.PAYMENT.PURCHASE_CART_ITEMS.NOT_FOUND_CART
      );
    }

    // 장바구니 items 불러오기
    const cartItems = await this.paymentRepository.getCartItems(cart.cartId);

    // 장바구니가 비어있을 경우 에러
    if (cartItems.length < 1) {
      throw new HttpError.BadRequest(
        MESSAGES.PAYMENT.PURCHASE_CART_ITEMS.EMPTY_CART
      );
    }

    // 총 합이 points보다 클 경우 에러
    let totalPrice = 0;
    for (let item of cartItems) {
      const itemPrice =
        (item.goodsOption.goods.price + item.goodsOption.addPrice) *
        item.quantity;
      totalPrice += itemPrice;

      // 재고 확인
      if (item.goodsOption.stock < item.quantity) {
        throw new HttpError.BadRequest(
          MESSAGES.PAYMENT.COMMON.INSUFFICIENT_STOCK(
            item.goodsOption.goods.goodsName
          )
        );
      }
    }

    if (totalPrice > points) {
      throw new HttpError.BadRequest(
        MESSAGES.PAYMENT.COMMON.INSUFFICIENT_POINTS
      );
    }

    // 결제 (지불 + 장바구니 비워주기)
    const paidItems = await this.paymentRepository.purchaseCartItems(
      userId,
      totalPrice,
      cart.cartId,
      cartItems
    );

    return paidItems;
  };

  // 바로구매
  buyNow = async (userId, points, goodsOptionId, quantity) => {
    // 상품 정보 불러오기
    const item = await this.paymentRepository.findItemById(goodsOptionId);

    // 포인트 확인
    const totalPrice = (item.addPrice + item.goods.price) * quantity;

    if (points < totalPrice) {
      throw new HttpError.BadRequest(
        MESSAGES.PAYMENT.COMMON.INSUFFICIENT_POINTS
      );
    }

    // 재고 확인
    if (item.stock < quantity) {
      throw new HttpError.BadRequest(
        MESSAGES.PAYMENT.COMMON.INSUFFICIENT_STOCK(item.goods.goodsName)
      );
    }

    // 결제
    const paidItem = await this.paymentRepository.buyNow(
      userId,
      totalPrice,
      goodsOptionId,
      quantity
    );

    return paidItem;
  };
}
