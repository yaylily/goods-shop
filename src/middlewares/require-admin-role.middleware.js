import { MESSAGES } from '../constant/message.constant.js';
import { USER_ROLE } from '../constant/user.constant.js';
import { HttpError } from '../errors/http-error.js';

export const requireAdminRole = (req, res, next) => {
  try {
    const { role } = req.user;
    if (role !== USER_ROLE.ADMIN) {
      throw new HttpError.Unauthorized(
        MESSAGES.USERS.AUTH.PERMISSION.ADMIN_ONLY
      );
    }

    next();
  } catch (err) {
    next(err);
  }
};
