import { HTTP_STATUS } from '../../constant/http-status.constant.js';
import { MESSAGES } from '../../constant/message.constant.js';
import { CartsService } from '../services/carts.service.js';
import { CartItemResponseDto } from '../dtos/cart-item.response.dto.js';

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
}
