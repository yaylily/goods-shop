import Joi from 'joi';
import { MESSAGES } from '../../constant/message.constant.js';

const schema = Joi.object({
  quantity: Joi.number().required().messages({
    'any.required': MESSAGES.PAYMENT.COMMON.QUANTITY.REQUIRED,
  }),
  address: Joi.string().required().messages({
    'any.required': MESSAGES.PAYMENT.COMMON.ADDRESS.REQUIRED,
  }),
  phone: Joi.string().required().messages({
    'any.required': MESSAGES.PAYMENT.COMMON.PHONE.REQUIRED,
  }),
});

export const BuyNowDTO = async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (err) {
    next(err);
  }
};
