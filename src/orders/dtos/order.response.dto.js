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
  }) {
    this.orderItemId = orderItemId;
    this.orderId = orderId;
    this.goodsOptionId = goodsOptionId;
    this.goodsOptionName = goodsOptionName;
    this.goodsPrice = goodsPrice;
    this.quantity = quantity;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export class OrderResponseDto {
  constructor({
    orderId,
    userId,
    totalPrice,
    address,
    phone,
    status,
    createdAt,
    updatedAt,
    orderItems,
  }) {
    this.orderId = orderId;
    this.userId = userId;
    this.totalPrice = totalPrice;
    this.address = address;
    this.phone = phone;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.orderItems = orderItems.map((item) => new OrderItemResponseDto(item));
  }
}
