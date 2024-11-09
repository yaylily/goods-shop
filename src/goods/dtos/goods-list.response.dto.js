export class GoodsListResponseDto {
  constructor({ goodsId, goodsName, price, thumbnailImg }) {
    this.goodsId = goodsId;
    this.goodsName = goodsName;
    this.price = price;
    this.thumbnailImg = thumbnailImg;
  }
}
