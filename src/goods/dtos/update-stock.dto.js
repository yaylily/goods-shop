import Joi from 'joi';
import { MESSAGES } from '../../constant/message.constant.js';

const schema = Joi.object({
  stock: Joi.number().required().messages({
    'any.required': MESSAGES.GOODS.UPDATE_STOCK.REQUIRED,
  }),
});

export const updateStockDTO = async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
};
