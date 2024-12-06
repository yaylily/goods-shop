import { UsersRepository } from '../repositories/users.repository.js';
import bcrypt from 'bcrypt';
import { HttpError } from '../../errors/http-error.js';
import { MESSAGES } from '../../constant/message.constant.js';
import { HASH_SALT_ROUNDS } from '../../constant/auth.constant.js';

export class UsersService {
  userRepository = new UsersRepository();

  updateMe = async (userId, password, name, phoneNumber, address) => {
    // 동일 비밀번호 확인
    const user = await this.userRepository.findUserById(userId);

    let hashedPassword;
    if (password) {
      const isSamePassword = bcrypt.compareSync(password, user.password);

      if (isSamePassword) {
        throw new HttpError.BadRequest(
          MESSAGES.USERS.AUTH.COMMON.PASSWORD.SAME_AS_OLD
        );
      }
      hashedPassword = bcrypt.hashSync(password, HASH_SALT_ROUNDS);
    }

    const userData = {
      password: hashedPassword,
      name,
      phoneNumber,
      address,
    };

    const updatedUser = await this.userRepository.updateMe(userId, userData);

    return updatedUser;
  };

  // 포인트 로그 조회
  getPointsLog = async (userId) => {
    return await this.userRepository.getPointsLog(userId);
  };
}
