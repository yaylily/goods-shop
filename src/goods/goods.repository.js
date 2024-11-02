import { prisma } from '../utils/prisma.util.js';

export class GoodsRepository {
  //굿즈 생성
  createGoods = async (goodsData, goodsOptions) => {
    // 굿즈 저장
    const createdGoods = await prisma.goods.create({
      data: {
        ...goodsData,
        goodsOptions: {
          create: goodsOptions,
        },
      },
      include: {
        goodsOptions: true,
      },
    });

    return createdGoods;
  };
}
