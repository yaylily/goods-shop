export class UserResponseDto {
  constructor({
    userId,
    email,
    name,
    phoneNumber,
    address,
    points,
    createdAt,
    updatedAt,
  }) {
    this.userId = userId;
    this.email = email;
    this.name = name;
    this.phoneNumber = phoneNumber;
    this.address = address;
    this.points = points;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
