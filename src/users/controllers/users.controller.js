import { HTTP_STATUS } from '../../constant/http-status.constant.js';
import { MESSAGES } from '../../constant/message.constant.js';
import { UserResponseDto } from '../dtos/user.response.dto.js';

export class UsersController {
  getMe = async (req, res, next) => {
    try {
      const user = req.user;

      const userResponseDto = new UserResponseDto(user);

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.USERS.READ_ME.SUCCEED,
        data: userResponseDto,
      });
    } catch (err) {
      next(err);
    }
  };
}
