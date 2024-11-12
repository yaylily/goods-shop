import { MESSAGES } from '../constant/message.constant.js';
import { USER_ROLE } from '../constant/user.constant.js';
import { HttpError } from '../errors/http-error.js';

export const requireAdminRole = (req, res, next) => {
  try {
    const { role } = req.user;
    if (role !== USER_ROLE.ADMIN) {
      throw new HttpError.Forbidden(MESSAGES.USERS.AUTH.COMMON.FORBIDDEN);
    }

    next();
  } catch (err) {
    next(err);
  }
};
