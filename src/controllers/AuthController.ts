import { BaseController } from './BaseController';
import { AuthService } from '../services/AuthService';
import { IAuthData } from '../interfaces/AuthData';
import { IAPIGatewayProxyEvent } from '../interfaces/APIGatewayProxyEvent';

export class AuthController extends BaseController {
  private constructor(private readonly authService: AuthService) {
    super();
  }

  static getInstance() {
    const authService = AuthService.getInstance();

    return new AuthController(authService);
  }

  login = async (event: IAPIGatewayProxyEvent<IAuthData>) => {
    const token = await this.authService.login(event.body);

    return this.response.success.ok({ token });
  }
}
