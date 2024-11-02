import { HTTP_STATUS } from '../constant/http-status.constant.js';
import { MESSAGES } from '../constant/message.constant.js';
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

      // 굿즈 반환 DTO로 구성
      const goodsResponseDto = new GoodsResponseDto(newGoods);

      return res.status(HTTP_STATUS.CREATED).json({
        status: HTTP_STATUS.CREATED,
        message: MESSAGES.GOODS.CREATE,
        newGoods,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  };

  // 굿즈 목록 조회

  // 굿즈 상세 조회

  // 굿즈 수정

  // 굿즈 삭제
}
