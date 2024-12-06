import { prisma } from '../../utils/prisma.util.js';

export class UsersRepository {
  //내정보 찾기
  findUserById = async (userId) => {
    return await prisma.user.findUnique({
      where: {
        userId,
      },
    });
  };

  // 내정보 업데이트
  updateMe = async (userId, userData) => {
    const updatedUser = await prisma.user.update({
      where: { userId },
      data: {
        ...userData,
      },
    });

    // 반환 값 비밀번호 제거
    updatedUser.password = undefined;

    return updatedUser;
  };

  // 포인트로그 조회
  getPointsLog = async (userId) => {
    return await prisma.pointsLog.findMany({
      where: { userId: +userId },
      orderBy: { createdAt: 'desc' },
    });
  };
}
