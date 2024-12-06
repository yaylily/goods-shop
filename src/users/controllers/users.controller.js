import { HTTP_STATUS } from '../../constant/http-status.constant.js';
import { MESSAGES } from '../../constant/message.constant.js';
import { UserResponseDto } from '../dtos/user.response.dto.js';
import { UsersService } from '../services/users.service.js';

export class UsersController {
  usersService = new UsersService();

  // 내 정보 조회
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

  //내 정보 수정
  updateMe = async (req, res, next) => {
    try {
      const { userId } = req.user;
      const { password, name, phoneNumber, address } = req.body;

      const updatedUser = await this.usersService.updateMe(
        userId,
        password,
        name,
        phoneNumber,
        address
      );

      const userResponseDto = new UserResponseDto(updatedUser);

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.USERS.UPDATE_ME.SUCCEED,
        data: userResponseDto,
      });
    } catch (err) {
      next(err);
    }
  };

  // 포인트 로그 조회
  getPointsLog = async (req, res, next) => {
    try {
      const { userId } = req.user;

      const pointsLogs = await this.usersService.getPointsLog(userId);

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.USERS.GET_POINTS_LOGS.SUCCEED,
        data: pointsLogs,
      });
    } catch (err) {
      next(err);
    }
  };
}
