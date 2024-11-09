import Joi from 'joi';
import { MESSAGES } from '../../constant/message.constant.js';
import { MIN_PASSWORD_LENGTH } from '../../constant/auth.constant.js';

const schema = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': MESSAGES.USERS.AUTH.COMMON.EMAIL.REQUIRED,
    'string.email': MESSAGES.USERS.AUTH.COMMON.EMAIL.INVALID_FORMAT,
  }),
  password: Joi.string().required().min(MIN_PASSWORD_LENGTH).messages({
    'any.required': MESSAGES.USERS.AUTH.COMMON.PASSWORD.REQUIRED,
    'string.min': MESSAGES.USERS.AUTH.COMMON.PASSWORD.MIN_LENGTH,
  }),
  passwordConfirm: Joi.string().required().valid(Joi.ref('password')).messages({
    'any.required': MESSAGES.USERS.AUTH.COMMON.PASSWORD_CONFIRM.REQUIRED,
    'any.only':
      MESSAGES.USERS.AUTH.COMMON.PASSWORD_CONFIRM.NOT_MATCHED_WITH_PASSWORD,
  }),
  name: Joi.string().required().messages({
    'any.required': MESSAGES.USERS.AUTH.COMMON.NAME.REQUIRED,
  }),
  phoneNumber: Joi.string().required().messages({
    'any.required': MESSAGES.USERS.AUTH.COMMON.PHONE.REQUIRED,
  }),
  address: Joi.string().required().messages({
    'any.required': MESSAGES.USERS.AUTH.COMMON.ADRESS.REQUIRED,
  }),
});

export const signUpDTO = async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (err) {
    next(err);
  }
};
