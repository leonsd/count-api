import { APIGatewayProxyEvent } from 'aws-lambda';

import { BaseController } from './BaseController';
import { UserService } from '../services/UserService';
import { IUserData } from '../interfaces/UserData';
import { IAPIGatewayProxyEvent } from '../interfaces/APIGatewayProxyEvent';

export class UserController extends BaseController {
  private constructor(private readonly userService: UserService) {
    super();
  }

  static getInstance() {
    const userService = UserService.getInstance();
    return new UserController(userService);
  }

  create = async (event: IAPIGatewayProxyEvent<IUserData>) => {
    const created = await this.userService.create(event.body);

    return this.response.success.created(created);
  }

  show = async (event: IAPIGatewayProxyEvent<null, { id: number }>) => {
    const user = await this.userService.show(event.pathParameters.id);

    return this.response.success.ok(user);
  }
}
