import { MESSAGES } from '../../constant/message.constant.js';
import { HttpError } from '../../errors/http-error.js';
import { CartsRepository } from '../repositories/carts.repository.js';

export class CartsService {
  cartsRepository = new CartsRepository();

  // 장바구니 상품 추가
  addToCart = async (userId, goodsOptionId, quantity) => {
    // 존재하는 장바구니인지 확인
    const existedCart = await this.cartsRepository.findCartById(userId);

    if (!existedCart) {
      throw new HttpError.NotFound(MESSAGES.CARTS.COMMON.NOT_FOUND);
    }

    // 이미 등록된 상품인지 확인
    const ExistedItem = await this.cartsRepository.findOptionById(
      existedCart.cartId,
      goodsOptionId
    );

    if (ExistedItem) {
      throw new HttpError.Conflict(MESSAGES.CARTS.COMMON.ITEM_ALREADY_EXISTS);
    }

    // 장바구니 추가
    const addedCart = await this.cartsRepository.addToCart(
      existedCart.cartId,
      goodsOptionId,
      quantity
    );

    return addedCart;
  };
}
