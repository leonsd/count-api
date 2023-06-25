import { UserRepository } from "../repositories/User";
import { IUserData } from "../interfaces/UserData";
import NotFoundException from "../exceptions/NotFoundException";
import ConflictException from "../exceptions/ConflictException";

export class UserService {
  private constructor(private readonly userRepository: UserRepository) { }

  static getInstance() {
    const userRepository = UserRepository.getInstance();
    return new UserService(userRepository);
  }

  create = async (data: IUserData) => {
    try {
      return await this.userRepository.create(data);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Email already registered');
      }

      throw error;
    }
  }

  show = async (id: number) => {
    const user = await this.userRepository.show(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
