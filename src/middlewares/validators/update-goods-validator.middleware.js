import Joi from 'joi';
import { MESSAGES } from '../../constant/message.constant.js';

const schema = Joi.object({
  goodsName: Joi.string(),
  description: Joi.string(),
  price: Joi.number(),
  thumbnailImg: Joi.string(),
  detailImg: Joi.string(),
  goodsOptions: Joi.array()
    .items(
      Joi.object({
        goodsId: Joi.number().required().messages({
          'any.required': MESSAGES.GOODS.UPDATE_GOODS.OPTIONS.GOODS_ID.REQUIRED,
        }),
        optionName: Joi.string().required().messages({
          'any.required':
            MESSAGES.GOODS.UPDATE_GOODS.OPTIONS.OPTIONNAME.REQUIRED,
        }),
        addPrice: Joi.number().required().messages({
          'any.required': MESSAGES.GOODS.UPDATE_GOODS.OPTIONS.ADDPRICE.REQUIRED,
        }),
        stock: Joi.number().required().messages({
          'any.required': MESSAGES.GOODS.UPDATE_GOODS.OPTIONS.STOCK.REQUIRED,
        }),
      }),
    )
    .min(1)
    .optional()
    .messages({
      'array.min': MESSAGES.GOODS.UPDATE_GOODS.OPTIONS.MIN,
    }),
});

export const updateGoodsValidator = async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
};
