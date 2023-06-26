import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import { UserRepository } from "../repositories/UserRepository";
import { IAuthData } from '../interfaces/AuthData';
import { IUserData } from '../interfaces/UserData';
import UnauthorizedException from '../exceptions/UnauthorizedException';

export class AuthService {
  constructor(private readonly userRepository: UserRepository) { }

  static getInstance() {
    const userRepository = UserRepository.getInstance();
    return new AuthService(userRepository);
  }

  authentication = async (data: IAuthData) => {
    const { email, password } = data;
    const userEntity = await this.userRepository.findByEmail(email);

    if (!userEntity) {
      throw new UnauthorizedException();
    }

    const match = await this.checkPassword(password, String(userEntity.password));

    if (!match) {
      throw new UnauthorizedException();
    }

    const user = userEntity.toJSON();
    const token = this.generateToken(user);

    return token;
  }

  private checkPassword = async (inputPassword: string, hashPassword: string) => {
    const match = await compare(inputPassword, hashPassword);

    return match;
  }

  private generateToken = (user: IUserData, expiresIn = '30m') => {
    const secret = process.env.JWT_SECRET;
    const token = sign(user, secret, { expiresIn });

    return token;
  }
}
