export class GoodsResponseDto {
  constructor({
    goodsId,
    goodsName,
    description,
    price,
    thumbnailImg,
    detailImg,
    goodsOptions,
    createdAt,
    updatedAt,
  }) {
    this.goodsId = goodsId;
    this.goodsName = goodsName;
    this.description = description;
    this.price = price;
    this.thumbnailImg = thumbnailImg;
    this.detailImg = detailImg;
    this.goodsOptions = goodsOptions;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
