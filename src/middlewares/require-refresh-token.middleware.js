import { MESSAGES } from '../constant/message.constant.js';
import { HttpError } from '../errors/http-error.js';
import jwt from 'jsonwebtoken';
import { REFRESH_TOKEN_SECRET } from '../constant/env.constant.js';
import { prisma } from '../utils/prisma.util.js';
import bcrypt from 'bcrypt';

export const requireRefreshToken = async (req, res, next) => {
  try {
    // 인증 정보 파싱
    const { authorization } = req.headers;
    console.log(authorization);
    // Authorization이 없는 경우
    if (!authorization) {
      throw new HttpError.Unauthorized(MESSAGES.USERS.AUTH.COMMON.JWT.NO_TOKEN);
    }

    // JWT 표준 인증 형태와 일치하지 않는 경우
    const [type, refreshToken] = authorization.split(' ');

    if (type !== 'Bearer') {
      throw new HttpError.Unauthorized(
        MESSAGES.USERS.AUTH.COMMON.JWT.NOT_SUPPORTED_TYPE
      );
    }

    // refreshToken이 없는 경우
    if (!refreshToken) {
      throw new HttpError.Unauthorized(MESSAGES.USERS.AUTH.COMMON.JWT.NO_TOKEN);
    }

    let payload;
    try {
      payload = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
    } catch (err) {
      // refreshToken 유효기간 지난 경우
      if (err.name === 'TokenExpiredError') {
        throw new HttpError.Unauthorized(
          MESSAGES.USERS.AUTH.COMMON.JWT.EXPIRED
        );
      } else {
        // 그 외 refreshToken 검증 실패한 경우
        throw new HttpError.Unauthorized(
          MESSAGES.USERS.AUTH.COMMON.JWT.INVALID
        );
      }
    }

    const { userId } = payload;

    // DB에서 RefreshToken을 조회
    const existedRefreshToken = await prisma.refreshToken.findUnique({
      where: { userId },
    });

    //넘겨 받은 RefreshToken과 비교
    const isValidRefreshToken =
      existedRefreshToken?.refreshToken &&
      bcrypt.compareSync(refreshToken, existedRefreshToken.refreshToken);

    //payload에 담긴 userId와 일치하는 사용자가 없는 경우
    if (!isValidRefreshToken) {
      throw new HttpError.Unauthorized(
        MESSAGES.USERS.AUTH.COMMON.JWT.DISCARDED_TOKEN
      );
    }

    const user = await prisma.user.findFirst({
      where: { userId },
      omit: { password: true },
    });

    if (!user) {
      throw new HttpError.Unauthorized(MESSAGES.USERS.AUTH.COMMON.JWT.NO_USER);
    }

    // req.user에 user 정보 담아주기
    req.user = user;

    next();
  } catch (err) {
    next(err);
  }
};
