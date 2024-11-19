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
  purchaseCartItems = async (userId, totalPrice, cartId, cartItems) => {
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
        data: { userId, totalPrice },
      });

      const orderItems = cartItems.map((item) => ({
        orderId: order.orderId,
        goodsOptionId: item.goodsOptionId,
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
}
