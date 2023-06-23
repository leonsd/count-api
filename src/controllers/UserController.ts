import { APIGatewayProxyEvent } from 'aws-lambda';
import { BaseController } from './BaseController';

export class UserController extends BaseController {
  private constructor() {
    super();
  }

  static getInstance() {
    return new UserController();
  }

  create = async (event: APIGatewayProxyEvent) => {
    return this.response.success.created(event.body);
  }

  show = async (event: APIGatewayProxyEvent) => {
    return this.response.success.ok(event.body);
  }
}
