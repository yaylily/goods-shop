import { HTTP_STATUS } from '../../constant/http-status.constant.js';
import { MESSAGES } from '../../constant/message.constant.js';
import { AuthService } from '../services/auth.service.js';

export class AuthController {
  authService = new AuthService();

  // 회원가입
  signUp = async (req, res, next) => {
    try {
      // body에서 회원가입 데이터 가져오기
      const { email, password, name, phoneNumber, address } = req.body;

      const user = await this.authService.signUp(
        email,
        password,
        name,
        phoneNumber,
        address,
      );

      return res.status(HTTP_STATUS.CREATED).json({
        status: HTTP_STATUS.CREATED,
        message: MESSAGES.USERS.AUTH.SIGN_UP.SUCCEED,
        data: user,
      });
    } catch (err) {
      next(err);
    }
  };
}
