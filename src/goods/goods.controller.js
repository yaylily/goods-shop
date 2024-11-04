import { HTTP_STATUS } from '../constant/http-status.constant.js';
import { MESSAGES } from '../constant/message.constant.js';
import { prisma } from '../utils/prisma.util.js';
import { GoodsListResponseDto } from './dtos/goods-list.response.dto.js';
import { GoodsResponseDto } from './dtos/goods.response.dto.js';
import { GoodsService } from './goods.service.js';

export class GoodsController {
  goodsService = new GoodsService();

  // 굿즈 생성
  createGoods = async (req, res, next) => {
    try {
      //req.body에서 goods 데이터 추출하여 객체로 묶어주기
      const goodsData = {
        goodsName: req.body.goodsName,
        description: req.body.description,
        price: req.body.price,
        thumbnailImg: req.body.thumbnailImg,
        detailImg: req.body.detailImg,
      };
      //req.body에서 options 배열 추출하여 선언
      const goodsOptions = req.body.goodsOptions;

      // 서비스로 goodsData와 goodsOptions 배열 넘기기
      const newGoods = await this.goodsService.createGoods(
        goodsData,
        goodsOptions,
      );

      // 굿즈 DTO로 반환
      const goodsResponseDto = new GoodsResponseDto(newGoods);

      return res.status(HTTP_STATUS.CREATED).json({
        status: HTTP_STATUS.CREATED,
        message: MESSAGES.GOODS.CREATE.SUCCEED,
        data: goodsResponseDto,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  };

  // 굿즈 목록 조회
  getGoodsList = async (req, res, next) => {
    try {
      //service에서 데이터 불러오기
      const goodsList = await this.goodsService.getGoodsList();

      //굿즈 리스트 DTO로 반환
      const goodsListResponseDto = goodsList.map(
        (goods) => new GoodsListResponseDto(goods),
      );

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.GOODS.GET_LIST.SUCCEED,
        data: goodsListResponseDto,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  };

  // 굿즈 상세 조회
  getGoodsDetail = async (req, res, next) => {
    try {
      const { goodsId } = req.params;

      const goodsDetail = await this.goodsService.getGoodsById(goodsId);

      // 굿즈 DTO로 반환
      const goodsResponseDto = new GoodsResponseDto(goodsDetail);

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.GOODS.GET_GOODS_DETAIL.SUCCEED,
        data: goodsResponseDto,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  };

  // 굿즈 수정
  updateGoods = async (req, res, next) => {
    try {
      const { goodsId } = req.params;
      //req.body에서 goods 데이터 추출하여 객체로 묶어주기
      const goodsData = {
        goodsName: req.body.goodsName,
        description: req.body.description,
        price: req.body.price,
        thumbnailImg: req.body.thumbnailImg,
        detailImg: req.body.detailImg,
      };
      //req.body에서 options 배열 추출하여 선언
      const goodsOptions = req.body.goodsOptions;

      // 서비스로 goodsData와 goodsOptions 배열 넘기기
      const updatedGoods = await this.goodsService.updateGoods(
        goodsId,
        goodsData,
        goodsOptions,
      );

      // 굿즈 DTO로 반환
      const goodsResponseDto = new GoodsResponseDto(updatedGoods);

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.GOODS.UPDATE_GOODS.SUCCEED,
        DATA: goodsResponseDto,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  };

  // 굿즈 삭제
}
