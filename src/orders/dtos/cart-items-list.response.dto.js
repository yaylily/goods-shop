export class GoodsResponseDto {
  constructor({ goodsId, goodsName, price, thumbnailImg, detailImg }) {
    this.goodsId = goodsId;
    this.goodsName = goodsName;
    this.price = price;
    this.thumbnailImg = thumbnailImg;
    this.detailImg = detailImg;
  }
}

export class GoodsOptionResponseDTO {
  constructor({ goodsOptionId, optionName, addPrice, goods }) {
    this.goodsOptionId = goodsOptionId;
    this.optionName = optionName;
    this.addPrice = addPrice;
    this.goods = new GoodsResponseDto(goods);
  }
}

export class CartItemResponseDto {
  constructor({
    cartItemId,
    cartId,
    quantity,
    itemPrice,
    createdAt,
    updatedAt,
    goodsOption,
  }) {
    (this.cartItemId = cartItemId),
      (this.cartId = cartId),
      (this.quantity = quantity),
      (this.itemPrice = itemPrice),
      (this.createdAt = createdAt),
      (this.updatedAt = updatedAt),
      (this.goodsOption = new GoodsOptionResponseDTO(goodsOption));
  }
}

export class CartItemsListResponseDTO {
  constructor({ cartItems, totalPrice }) {
    this.cartItems = cartItems.map((item) => new CartItemResponseDto(item));
    this.totalPrice = totalPrice;
  }
}
