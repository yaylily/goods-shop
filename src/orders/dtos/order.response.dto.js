export class OrderItemResponseDto {
  constructor({
    orderItemId,
    orderId,
    goodsOptionId,
    goodsOptionName,
    goodsPrice,
    quantity,
    createdAt,
    updatedAt,
    goodsOption,
  }) {
    this.orderItemId = orderItemId;
    this.orderId = orderId;
    this.goodsOptionId = goodsOptionId;
    this.goodsOptionName = goodsOptionName;
    this.goodsPrice = goodsPrice;
    this.quantity = quantity;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.goodsOption = goodsOption;
  }
}

export class OrderResponseDto {
  constructor({
    orderId,
    userId,
    totalPrice,
    createdAt,
    updatedAt,
    orderItems,
  }) {
    this.orderId = orderId;
    this.userId = userId;
    this.totalPrice = totalPrice;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.orderItems = orderItems.map((item) => new OrderItemResponseDto(item));
  }
}
