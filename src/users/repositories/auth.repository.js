import { prisma } from '../../utils/prisma.util.js';

export class AuthRepository {
  // 이메일 조회
  findUserByEmail = async (email) => {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    });
  };

  // 회원가입
  signUp = async (email, hashedPassword, name, phoneNumber, address) => {
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        phoneNumber,
        address,
        points: 500000,
      },
    });

    // 반환 값 비밀번호 제거
    user.password = undefined;

    return user;
  };

  // refreshToken 저장
  saveRefreshToken = async (userId, hashedRefreshToken) => {
    return await prisma.refreshToken.upsert({
      where: { userId },
      update: { refreshToken: hashedRefreshToken },
      create: {
        userId,
        refreshToken: hashedRefreshToken,
      },
    });
  };

  // 로그아웃
  signOut = async (userId) => {
    await prisma.refreshToken.update({
      where: { userId },
      data: { refreshToken: null },
    });
  };
}
