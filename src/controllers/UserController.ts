import { APIGatewayProxyEvent } from 'aws-lambda';
import { BaseController } from './BaseController';
import { UserService } from '../services/UserService';

export class UserController extends BaseController {
  private constructor(private readonly userService: UserService) {
    super();
  }

  static getInstance() {
    const userService = UserService.getInstance();
    return new UserController(userService);
  }

  create = async (event: APIGatewayProxyEvent) => {
    const created = await this.userService.create(event.body);
    return this.response.success.created(created);
  }

  show = async (event: APIGatewayProxyEvent) => {
    const user = await this.userService.show(Number(event.pathParameters?.id));
    return this.response.success.ok(user);
  }
}
