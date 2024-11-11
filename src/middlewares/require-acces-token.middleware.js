import { MESSAGES } from '../constant/message.constant.js';
import { HttpError } from '../errors/http-error.js';
import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET } from '../constant/env.constant.js';
import { prisma } from '../utils/prisma.util.js';

export const requireAccessToken = async (req, res, next) => {
  try {
    // 인증 정보 파싱
    const { authorization } = req.headers;
    console.log(authorization);
    // Authorization이 없는 경우
    if (!authorization) {
      throw new HttpError.Unauthorized(MESSAGES.USERS.AUTH.COMMON.JWT.NO_TOKEN);
    }

    // JWT 표준 인증 형태와 일치하지 않는 경우
    const [type, accessToken] = authorization.split(' ');

    if (type !== 'Bearer') {
      throw new HttpError.Unauthorized(
        MESSAGES.USERS.AUTH.COMMON.JWT.NOT_SUPPORTED_TYPE
      );
    }

    // accessToken이 없는 경우
    if (!accessToken) {
      throw new HttpError.Unauthorized(MESSAGES.USERS.AUTH.COMMON.JWT.NO_TOKEN);
    }

    let payload;
    try {
      payload = jwt.verify(accessToken, ACCESS_TOKEN_SECRET);
    } catch (err) {
      // accessToken 유효기간 지난 경우
      if (err.name === 'TokenExpiredError') {
        throw HttpError.Unauthorized(MESSAGES.USERS.AUTH.COMMON.JWT.EXPIRED);
      } else {
        // 그 외 accessToken 검증 실패한 경우
        throw HttpError.Unauthorized(MESSAGES.USERS.AUTH.COMMON.JWT.INVALID);
      }
    }

    //payload에 담긴 userId와 일치하는 사용자가 없는 경우
    const { userId } = payload;
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
