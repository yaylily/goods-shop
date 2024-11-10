export class SignInResponseDTO {
  constructor({ accessToken, userId, expiresIn }) {
    this.accessToken = accessToken;
    this.userId = userId;
    this.expiresIn = expiresIn;
  }
}
