export class SignInResponseDTO {
  constructor({ accessToken, refreshToken, userId, expiresIn }) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.userId = userId;
    this.expiresIn = expiresIn;
  }
}
