import { MESSAGES } from '../constant/message.constant.js';
import { GoodsRepository } from './goods.repository.js';
import { HttpError } from '../errors/http-error.js';

export class GoodsService {
  goodsRepository = new GoodsRepository();

  // 굿즈 디테일 조회 & 굿즈 존재 여부 검증
  getGoodsById = async (goodsId) => {
    const goods = await this.goodsRepository.getGoodsById(goodsId);
    if (!goods) {
      throw new HttpError.NotFound(MESSAGES.GOODS.COMMON.NOT_FOUND);
    }
    return goods;
  };

  // 굿즈 생성
  createGoods = async (goodsData, goodsOptions) => {
    //이미 존재하는 굿즈 이름인지 체크
    const existedGoodsName = await this.goodsRepository.findByGoodsName(
      goodsData.goodsName,
    );

    // 동일 이름 존재할 시 에러
    if (existedGoodsName) {
      throw new HttpError.BadRequest(MESSAGES.GOODS.COMMON.NAME_ALREADY_EXISTS);
    }

    // 메뉴 생성 repository로 전달
    const createdMGoods = await this.goodsRepository.createGoods(
      goodsData,
      goodsOptions,
    );

    return createdMGoods;
  };

  // 굿즈 리스트 조회
  getGoodsList = async () => {
    //repository에서 굿즈 리스트 데이터 조회
    const goodsList = await this.goodsRepository.getGoodsList();

    return goodsList;
  };

  // 굿즈 수정
  updateGoods = async (goodsId, goodsData, goodsOptions) => {
    //굿즈가 존재하는지 확인
    await this.getGoodsById(goodsId);

    await this.goodsRepository.updateGoods(goodsId, goodsData);

    //굿즈 옵션 수정 있을 경우에 repository 전달
    if (goodsOptions) {
      await this.goodsRepository.updateGoodsOptions(goodsId, goodsOptions);
    }

    // 옵션 포함 수정 후 굿즈 조회
    const updatedGoods = await this.goodsRepository.getGoodsById(goodsId);

    return updatedGoods;
  };

  // 굿즈 재고 수정
  updateStock = async (goodsId, goodsOptionId, stock) => {
    //굿즈 옵션이 존재하는지 확인
    const goodsOption =
      await this.goodsRepository.findGoodsOptionById(goodsOptionId);
    if (!goodsOption) {
      throw new HttpError.NotFound(MESSAGES.GOODS.COMMON.OPTION_NOT_FOUND);
    }

    // 굿즈 재고 업데이트
    await this.goodsRepository.updateStock(goodsOptionId, stock);

    // 재고 수정 후 굿즈 조회
    const updatedGoods = await this.goodsRepository.getGoodsById(goodsId);

    return updatedGoods;
  };

  // 굿즈 삭제
  deleteGoods = async (goodsId) => {
    //굿즈가 존재하는지 확인
    await this.getGoodsById(goodsId);

    //repository에서 굿즈 삭제
    await this.goodsRepository.deleteGoods(goodsId);
  };
}
