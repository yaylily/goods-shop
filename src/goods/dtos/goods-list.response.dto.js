export class GoodsListResponseDto {
  constructor({ goodsName, price, thumbnailImg }) {
    this.goodsName = goodsName;
    this.price = price;
    this.thumbnailImg = thumbnailImg;
  }
}
