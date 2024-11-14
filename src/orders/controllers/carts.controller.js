import { HTTP_STATUS } from '../../constant/http-status.constant.js';
import { MESSAGES } from '../../constant/message.constant.js';
import { CartsService } from '../services/carts.service.js';
import { CartItemResponseDto } from '../dtos/cart-item.response.dto.js';
import { CartItemsListResponseDTO } from '../dtos/cart-items-list.response.dto.js';

export class CartsController {
  cartsService = new CartsService();

  // 장바구니 상품 추가
  addToCart = async (req, res, next) => {
    try {
      const { userId } = req.user;
      const { goodsOptionId } = req.params;
      const { quantity } = req.body;

      const addedToCart = await this.cartsService.addToCart(
        userId,
        goodsOptionId,
        quantity
      );

      const cartItemResponseDTO = new CartItemResponseDto(addedToCart);

      return res.status(HTTP_STATUS.CREATED).json({
        status: HTTP_STATUS.CREATED,
        message: MESSAGES.CARTS.ADD_TO_CART.SUCCED,
        data: cartItemResponseDTO,
      });
    } catch (err) {
      next(err);
    }
  };

  // 장바구니 조회
  getCartItems = async (req, res, next) => {
    try {
      const { userId } = req.user;

      const cartItems = await this.cartsService.getCartItems(userId);

      const cartItemsListResponseDTO = new CartItemsListResponseDTO(cartItems);

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.CARTS.GET_CART.SUCCED,
        data: cartItemsListResponseDTO,
      });
    } catch (err) {
      next(err);
    }
  };

  // 장바구니 상품 수량 수정
  updateQuantity = async (req, res, next) => {
    try {
      const { cartItemId } = req.params;
      const { quantity } = req.body;

      const updatedCartItem = await this.cartsService.updateQuantity(
        cartItemId,
        quantity
      );

      const cartItemResponseDTO = new CartItemResponseDto(updatedCartItem);

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.CARTS.UPDATE_QUANTITY.SUCCED,
        data: cartItemResponseDTO,
      });
    } catch (err) {
      next(err);
    }
  };
}
