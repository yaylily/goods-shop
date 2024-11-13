import Joi from 'joi';
import { MESSAGES } from '../../constant/message.constant.js';
import { MIN_PASSWORD_LENGTH } from '../../constant/auth.constant.js';

const schema = Joi.object({
  password: Joi.string().min(MIN_PASSWORD_LENGTH).messages({
    'string.min': MESSAGES.USERS.AUTH.COMMON.PASSWORD.MIN_LENGTH,
  }),
  passwordConfirm: Joi.string()
    .valid(Joi.ref('password'))
    .when('password', {
      is: Joi.exist(),
      then: Joi.required().messages({
        'any.required': MESSAGES.USERS.AUTH.COMMON.PASSWORD_CONFIRM.REQUIRED,
      }),
    })
    .messages({
      'any.only':
        MESSAGES.USERS.AUTH.COMMON.PASSWORD_CONFIRM.NOT_MATCHED_WITH_PASSWORD,
    }),
  name: Joi.string(),
  phoneNumber: Joi.string(),
  address: Joi.string(),
});

export const userUpdateDTO = async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (err) {
    next(err);
  }
};
