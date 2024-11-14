import { prisma } from '../../utils/prisma.util.js';

export class CartsRepository {
  // userId로 카트 찾기
  findCartById = async (userId) => {
    return prisma.cart.findUnique({
      where: { userId },
    });
  };

  // 옵션 카트에 존재 여부 확인
  findOptionById = async (cartId, goodsOptionId) => {
    return prisma.cartItem.findFirst({
      where: { cartId, goodsOptionId: +goodsOptionId },
    });
  };

  // 장바구니 상품 추가
  addToCart = async (cartId, goodsOptionId, quantity) => {
    return prisma.cartItem.create({
      data: { cartId, goodsOptionId: +goodsOptionId, quantity },
    });
  };

  // 장바구니 상품 조회
  getCartItems = async (cartId) => {
    return prisma.cartItem.findMany({
      where: { cartId },
      include: {
        goodsOption: {
          include: {
            goods: true,
          },
        },
      },
    });
  };
}
