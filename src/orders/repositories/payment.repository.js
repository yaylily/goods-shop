import { prisma } from '../../utils/prisma.util.js';

export class PaymentRepository {
  findCartById = async (userId) => {
    return await prisma.cart.findUnique({
      where: { userId },
    });
  };

  getCartItems = async (cartId) => {
    return await prisma.cartItem.findMany({
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

  // 장바구니 구매 트렌젝션
  purchaseCartItems = async (
    userId,
    totalPrice,
    address,
    phone,
    cartId,
    cartItems
  ) => {
    return prisma.$transaction(async (prisma) => {
      // 포인트 차감
      await prisma.user.update({
        where: { userId },
        data: { points: { decrement: totalPrice } },
      });

      // 재고 조정
      for (let item of cartItems) {
        await prisma.goodsOption.update({
          where: { goodsOptionId: item.goodsOptionId },
          data: { stock: { decrement: item.quantity } },
        });
      }

      // 장바구니 아이템 삭제
      await prisma.cartItem.deleteMany({
        where: { cartId },
      });

      // 결제 기록 추가
      const order = await prisma.order.create({
        data: { userId, totalPrice, address, phone },
      });

      const orderItems = cartItems.map((item) => ({
        orderId: order.orderId,
        goodsOptionId: item.goodsOptionId,
        goodsOptionName: item.goodsOption.optionName,
        goodsPrice: item.goodsOption.addPrice + item.goodsOption.goods.price,
        quantity: item.quantity,
      }));

      await prisma.orderItem.createMany({
        data: orderItems,
      });

      // 반환 결제 데이터
      return await prisma.order.findUnique({
        where: { orderId: order.orderId },
        include: { orderItems: true },
      });
    });
  };

  findItemById = async (goodsOptionId) => {
    return await prisma.goodsOption.findUnique({
      where: { goodsOptionId: +goodsOptionId },
      include: { goods: true },
    });
  };

  // 바로주문 트랜젝션
  buyNow = async (userId, totalPrice, goodsOptionId, quantity) => {
    return await prisma.$transaction(async (prisma) => {
      // 포인트 차감
      await prisma.user.update({
        where: { userId },
        data: { points: { decrement: totalPrice } },
      });

      // 재고 조정
      const item = await prisma.goodsOption.update({
        where: { goodsOptionId: +goodsOptionId },
        data: { stock: { decrement: quantity } },
        select: {
          optionName: true,
        },
      });

      // 주문 정보 생성
      const order = await prisma.order.create({
        data: { userId, totalPrice },
      });

      await prisma.orderItem.create({
        data: {
          orderId: order.orderId,
          goodsOptionId: +goodsOptionId,
          goodsOptionName: item.optionName,
          goodsPrice: totalPrice,
          quantity,
        },
      });

      // 반환 결제 데이터
      return await prisma.order.findUnique({
        where: { orderId: order.orderId },
        include: { orderItems: true },
      });
    });
  };

  // 회원별 주문 목록 조회
  getOrderList = async (userId) => {
    return await prisma.order.findMany({
      where: { userId },
      include: { orderItems: true },
    });
  };
}
