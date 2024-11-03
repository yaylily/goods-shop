export class GoodsResponseDto {
  constructor({
    goodsName,
    description,
    price,
    thumbnailImg,
    detailImg,
    goodsOptions,
  }) {
    this.goodsName = goodsName;
    this.description = description;
    this.price = price;
    this.thumbnailImg = thumbnailImg;
    this.detailImg = detailImg;
    this.goodsOptions = goodsOptions;
  }
}
