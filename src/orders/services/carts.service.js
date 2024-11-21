import { MESSAGES } from '../../constant/message.constant.js';
import { HttpError } from '../../errors/http-error.js';
import { CartsRepository } from '../repositories/carts.repository.js';

export class CartsService {
  cartsRepository = new CartsRepository();

  // 장바구니가 존재하는지 확인
  async verifyCartExist(userId) {
    const cart = await this.cartsRepository.findCartById(userId);

    if (!cart) {
      throw new HttpError.NotFound(MESSAGES.CARTS.COMMON.NOT_FOUND_CART);
    }

    return cart;
  }

  // 장바구니 아이템이 존재하는지 확인
  async verifyCartItemExist(cartItemId) {
    const cartItem = await this.cartsRepository.findCartItemById(cartItemId);

    if (!cartItem) {
      throw new HttpError.NotFound(MESSAGES.CARTS.COMMON.NOT_FOUND_ITEM);
    }
    return cartItem;
  }

  // 장바구니 상품 추가
  addToCart = async (userId, goodsOptionId, quantity) => {
    // 존재하는 장바구니인지 확인
    const existedCart = await this.verifyCartExist(userId);

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

  // 장바구니 조회
  getCartItems = async (userId) => {
    // 존재하는 장바구니인지 확인
    const cart = await this.verifyCartExist(userId);

    const cartItems = await this.cartsRepository.getCartItems(cart.cartId);

    let totalPrice = 0;

    const itemsWithPrice = cartItems.map((item) => {
      const itemPrice =
        item.quantity *
        (item.goodsOption.addPrice + item.goodsOption.goods.price);
      totalPrice += itemPrice;

      return {
        ...item,
        itemPrice,
      };
    });

    return { cartItems: itemsWithPrice, totalPrice };
  };

  // 특정 사용자에 대한 장바구니와 아이템 검증
  async verifyCartAndItem(userId, cartItemId) {
    await this.verifyCartExist(userId);
    await this.verifyCartItemExist(cartItemId);
  }

  // 장바구니 수량 수정
  updateQuantity = async (userId, cartItemId, quantity) => {
    // 장바구니, 상품 확인
    await this.verifyCartAndItem(userId, cartItemId);

    return await this.cartsRepository.updateQuantity(cartItemId, quantity);
  };

  // 장바구니 상품 삭제
  deleteCartItem = async (userId, cartItemId) => {
    // 장바구니, 상품 확인
    await this.verifyCartAndItem(userId, cartItemId);

    await this.cartsRepository.deleteCartItem(cartItemId);
  };
}
