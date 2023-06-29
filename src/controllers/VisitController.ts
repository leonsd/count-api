import { IAPIGatewayProxyEvent } from '../interfaces/APIGatewayProxyEvent';
import { VisitService } from '../services/VisitService';
import { BaseController } from './BaseController';

export class VisitController extends BaseController {
  private constructor(private readonly visitService: VisitService) {
    super();
  }

  static getInstance() {
    const visitService = VisitService.getInstance();
    return new VisitController(visitService);
  }

  increment = async (
    event: IAPIGatewayProxyEvent<null, { namespace: string }>
  ) => {
    const namespace = event.pathParameters.namespace;
    const response = await this.visitService.increment(namespace);

    return this.response.success.ok({
      message: 'Increment visit successfully!',
      response,
    });
  };

  get = async (event: IAPIGatewayProxyEvent<null, { namespace: string }>) => {
    const namespace = event.pathParameters.namespace;
    const visits = await this.visitService.get(namespace);

    return this.response.success.ok({
      message: 'Get visit successfully!',
      visits,
    });
  };
}
