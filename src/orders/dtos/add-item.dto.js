import Joi from 'joi';
import { MESSAGES } from '../../constant/message.constant.js';

const schema = Joi.object({
  quantity: Joi.number().required().messages({
    'any.required': MESSAGES.CARTS.ADD_TO_CART.QUANTITY.REQUIRED,
  }),
});

export const AddItemDTO = async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (err) {
    next(err);
  }
};
