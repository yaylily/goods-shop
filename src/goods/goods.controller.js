import { HTTP_STATUS } from '../constant/http-status.constant.js';
import { MESSAGES } from '../constant/message.constant.js';
import { HttpError } from '../errors/http-error.js';
import { GoodsListResponseDto } from './dtos/goods-list.response.dto.js';
import { GoodsResponseDto } from './dtos/goods.response.dto.js';
import { GoodsService } from './goods.service.js';
import { deleteImageFromS3 } from '../utils/s3.util.js';

export class GoodsController {
  goodsService = new GoodsService();

  // goods 데이터 DTO 형식으로 반환
  formatGoodsResponseDto(goods) {
    return new GoodsResponseDto(goods);
  }

  // 굿즈 생성
  createGoods = async (req, res, next) => {
    let thumbnailImg, detailImg;
    try {
      const { goodsName, description, price } = req.body;
      thumbnailImg = req.files['thumbnailImg']?.[0]?.location;
      detailImg = req.files['detailImg']?.[0].location;

      // 이미지 없을 경우 오류
      if (!thumbnailImg || !detailImg) {
        throw new HttpError.BadRequest(
          MESSAGES.GOODS.UPLOAD_IMG.REQUIRED_FILES_MISSING
        );
      }
      //req.body에서 goods 데이터 추출하여 객체로 묶어주기
      const goodsData = {
        goodsName,
        description,
        price: +price,
        thumbnailImg,
        detailImg,
      };
      //req.body에서 options 배열 추출하여 선언
      const goodsOptions = req.body.goodsOptions;

      // 서비스로 goodsData와 goodsOptions 배열 넘기기
      const newGoods = await this.goodsService.createGoods(
        goodsData,
        goodsOptions
      );

      // 굿즈 DTO로 반환
      const goodsResponseDto = this.formatGoodsResponseDto(newGoods);

      return res.status(HTTP_STATUS.CREATED).json({
        status: HTTP_STATUS.CREATED,
        message: MESSAGES.GOODS.CREATE.SUCCEED,
        data: goodsResponseDto,
      });
    } catch (err) {
      if (thumbnailImg) deleteImageFromS3(thumbnailImg);
      if (detailImg) deleteImageFromS3(detailImg);
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
        (goods) => new GoodsListResponseDto(goods)
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
      const goodsResponseDto = this.formatGoodsResponseDto(goodsDetail);

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
        goodsOptions
      );

      // 굿즈 DTO로 반환
      const goodsResponseDto = this.formatGoodsResponseDto(updatedGoods);

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

  // 굿즈 재고 수정
  updateStock = async (req, res, next) => {
    try {
      const { goodsId, goodsOptionId } = req.params;
      const { stock } = req.body;

      //서비스로 값 전달하여 업데이트 수행
      const updatedGoods = await this.goodsService.updateStock(
        goodsId,
        goodsOptionId,
        stock
      );

      // 굿즈 DTO로 반환
      const goodsResponseDto = this.formatGoodsResponseDto(updatedGoods);

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.GOODS.UPDATE_STOCK.SUCCEED,
        data: goodsResponseDto,
      });
    } catch (err) {
      next(err);
    }
  };

  // 굿즈 삭제
  goodsDelete = async (req, res, next) => {
    try {
      const { goodsId } = req.params;

      // 서비스로 goodsId 넘기기
      await this.goodsService.deleteGoods(goodsId);

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.GOODS.DELETE_GOODS.SUCCEED,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  };
}
