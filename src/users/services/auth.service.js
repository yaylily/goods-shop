import { MESSAGES } from '../../constant/message.constant.js';
import { HttpError } from '../../errors/http-error.js';
import { AuthRepository } from '../repositories/auth.repository.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {
  HASH_SALT_ROUNDS,
  ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_EXPIRES_IN,
} from '../../constant/auth.constant.js';
import {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
} from '../../constant/env.constant.js';

export class AuthService {
  authRepository = new AuthRepository();

  // 회원가입
  signUp = async (email, password, name, phoneNumber, address) => {
    // 이메일 중복 여부 확인
    const existedUser = await this.authRepository.findUserByEmail(email);

    if (existedUser) {
      throw new HttpError.Conflict(MESSAGES.USERS.AUTH.COMMON.EMAIL.DUPLICATED);
    }

    const hashedPassword = bcrypt.hashSync(password, HASH_SALT_ROUNDS);

    const user = await this.authRepository.signUp(
      email,
      hashedPassword,
      name,
      phoneNumber,
      address
    );

    return user;
  };

  // 로그인
  signIn = async (email, password) => {
    // 해당 유저 정보 가져오기
    const user = await this.authRepository.findUserByEmail(email);

    // 해당 이메일 유저 없을 시 오류
    if (!user) {
      throw new HttpError.NotFound(MESSAGES.USERS.AUTH.COMMON.EMAIL.NOT_FOUND);
    }

    // 일치하는 비밀번호가 있는지 확인
    const isPasswordMatched = bcrypt.compareSync(password, user.password);

    // 일치하지 않을 경우 오류
    if (!isPasswordMatched) {
      throw new HttpError.Unauthorized(MESSAGES.USERS.AUTH.COMMON.UNAUTORIZED);
    }

    return this.generateAuthTokens({ userId: user.userId });
  };

  // 토큰 재발급
  refreshToken = async (userId) => {
    return this.generateAuthTokens({ userId });
  };

  // 토큰 생성 함수
  generateAuthTokens = async (payload) => {
    // accessToken, refreshToken 생성
    const accessToken = this.createToken(
      payload,
      ACCESS_TOKEN_SECRET,
      ACCESS_TOKEN_EXPIRES_IN
    );
    const refreshToken = this.createToken(
      payload,
      REFRESH_TOKEN_SECRET,
      REFRESH_TOKEN_EXPIRES_IN
    );

    // refreshToken 저장
    const hashedRefreshToken = bcrypt.hashSync(refreshToken, HASH_SALT_ROUNDS);

    await this.authRepository.saveRefreshToken(
      payload.userId,
      hashedRefreshToken
    );

    return {
      userId: payload.userId,
      accessToken,
      refreshToken,
      expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    };
  };

  //JWT 토큰 생성
  createToken = (payload, secret, expiresIn) => {
    return jwt.sign(payload, secret, { expiresIn });
  };

  // 로그아웃
  signOut = async (userId) => {
    return await this.authRepository.signOut(userId);
  };
}
