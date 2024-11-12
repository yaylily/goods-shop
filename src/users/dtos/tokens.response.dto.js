export class TokensResponseDTO {
  constructor({ userId, accessToken, refreshToken, expiresIn }) {
    this.userId = userId;
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.expiresIn = expiresIn;
  }
}
