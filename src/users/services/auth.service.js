import { MESSAGES } from '../../constant/message.constant.js';
import { HttpError } from '../../errors/http-error.js';
import { AuthRepository } from '../repositories/auth.repository.js';
import bcrypt from 'bcrypt';
import { HASH_SALT_ROUNDS } from '../../constant/auth.constant.js';

export class AuthService {
  authRepository = new AuthRepository();

  // 회원가입
  signUp = async (email, password, name, phoneNumber, address) => {
    // 이메일 중복 여부 확인
    const existedUser = await this.authRepository.findUserByEmail(email);

    if (existedUser) {
      throw new HttpError.Conflict(MESSAGES.USERS.AUTH.COMMON.EMAIL.DUPLICATED);
    }

    const hashedPassword = bcrypt.hashSync(password, HASH_SALT_ROUNDS);

    const user = await this.authRepository.signUp(
      email,
      hashedPassword,
      name,
      phoneNumber,
      address,
    );

    return user;
  };
}
