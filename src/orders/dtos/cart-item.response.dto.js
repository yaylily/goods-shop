export class CartItemResponseDto {
  constructor({
    cartItemId,
    cartId,
    goodsOptionId,
    quantity,
    createdAt,
    updatedAt,
  }) {
    this.cartItemId = cartItemId;
    this.cartId = cartId;
    this.goodsOptionId = goodsOptionId;
    this.quantity = quantity;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
