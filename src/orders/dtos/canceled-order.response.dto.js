export class CanceledOrderResponseDto {
  constructor({
    orderId,
    userId,
    totalPrice,
    address,
    phone,
    status,
    createdAt,
    updatedAt,
  }) {
    this.orderId = orderId;
    this.userId = userId;
    this.totalPrice = totalPrice;
    this.address = address;
    this.phone = phone;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
