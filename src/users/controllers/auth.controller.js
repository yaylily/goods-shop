import { HTTP_STATUS } from '../../constant/http-status.constant.js';
import { MESSAGES } from '../../constant/message.constant.js';
import { AuthService } from '../services/auth.service.js';
import { UserResponseDto } from '../dtos/user.response.dto.js';
import { SignInResponseDTO } from '../dtos/sign-in.response.dto.js';

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

      const userResponseDto = new UserResponseDto(user);

      return res.status(HTTP_STATUS.CREATED).json({
        status: HTTP_STATUS.CREATED,
        message: MESSAGES.USERS.AUTH.SIGN_UP.SUCCEED,
        data: userResponseDto,
      });
    } catch (err) {
      next(err);
    }
  };

  // 로그인
  signIn = async (req, res, next) => {
    try {
      const { email, password } = req.body;

      // 로그인 후 토근 발급
      const userData = await this.authService.signIn(email, password);

      const sginInResponseDTO = new SignInResponseDTO(userData);

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.USERS.AUTH.SIGN_IN.SUCCEED,
        data: sginInResponseDTO,
      });
    } catch (err) {
      next(err);
    }
  };
}
