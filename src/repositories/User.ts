import { User } from "../models/User";

export class UserRepository {
  private constructor() { }

  static getInstance() {
    return new UserRepository();
  }

  create = async (data: any) => {
    const user = new User();
    user.name = data.name;
    user.email = data.email;
    user.password = data.password;

    return user.save();
  }

  show = (id: number) => {
    return User.findOneBy({ id });
  }
}
