import Joi from 'joi';
import { MESSAGES } from '../../constant/message.constant.js';

const schema = Joi.object({
  goodsName: Joi.string().required().messages({
    'any.required': MESSAGES.GOODS.CREATE.GOODSNAME.REQUIRED,
  }),
  description: Joi.string().required().messages({
    'any.required': MESSAGES.GOODS.CREATE.DESCRIPTION.REQUIRED,
  }),
  price: Joi.number().required().messages({
    'any.required': MESSAGES.GOODS.CREATE.PRICE.REQUIRED,
  }),
  thumbnailImg: Joi.string().required().messages({
    'any.required': MESSAGES.GOODS.CREATE.THUMBNAILIMG.REQUIRED,
  }),
  detailImg: Joi.string().required().messages({
    'any.required': MESSAGES.GOODS.CREATE.DETAILIMG.REQUIRED,
  }),
});

export const createGoodsValidator = async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (err) {
    next(err);
  }
};
