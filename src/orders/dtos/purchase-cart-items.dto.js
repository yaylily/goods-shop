import Joi from 'joi';
import { MESSAGES } from '../../constant/message.constant.js';

const schema = Joi.object({
  address: Joi.string().required().messages({
    'any.required': MESSAGES.PAYMENT.COMMON.ADDRESS.REQUIRED,
  }),
  phone: Joi.string().required().messages({
    'any.required': MESSAGES.PAYMENT.COMMON.PHONE.REQUIRED,
  }),
});

export const PurchaseCartItemsDTO = async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (err) {
    next(err);
  }
};
