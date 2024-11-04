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

  // 굿즈 이름 조회
  findByGoodsName = async (goodsName) => {
    const existedGoodsName = await prisma.goods.findFirst({
      where: { goodsName },
    });

    return existedGoodsName;
  };

  // 굿즈 리스트 조회
  getGoodsList = async () => {
    const goodsList = await prisma.goods.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return goodsList;
  };

  // 굿즈 상세 조회
  getGoodsById = async (goodsId) => {
    const goodsDetail = await prisma.goods.findFirst({
      where: { goodsId: +goodsId },
      include: {
        goodsOptions: true,
      },
    });

    return goodsDetail;
  };

  //굿즈 수정
  updateGoods = async (goodsId, goodsData) => {
    return await prisma.goods.update({
      where: { goodsId: +goodsId },
      data: { ...goodsData },
    });
  };

  //굿즈 옵션 수정
  updateGoodsOptions = async (goodsId, goodsOptions) => {
    await prisma.$transaction([
      prisma.goodsOption.deleteMany({
        where: { goodsId: +goodsId },
      }),
      prisma.goodsOption.createMany({
        data: goodsOptions.map((option) => ({
          goodsId: +goodsId,
          ...option,
        })),
      }),
    ]);
  };
}
