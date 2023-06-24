import { User } from "../models/User";

export class UserRepository {
  private constructor(private readonly model: User) { }

  static getInstance() {
    const user = new User();
    return new UserRepository(user);
  }

  create = async (data: any) => {
    this.model.name = data.name;
    this.model.email = data.email;
    this.model.password = data.password;

    return this.model.save();
  }

  show = (id: number) => {
    return User.findOneBy({ id });
  }
}
