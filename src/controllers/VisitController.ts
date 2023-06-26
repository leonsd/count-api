import { IAPIGatewayProxyEvent } from "../interfaces/APIGatewayProxyEvent";
import { CountApiService } from "../services/CountApiService";
import { BaseController } from "./BaseController";

export class VisitController extends BaseController {
  private constructor(private readonly countApiService: CountApiService) {
    super();
  }

  static getInstance() {
    const countApiService = CountApiService.getInstance();
    return new VisitController(countApiService);
  }

  increment = async (event: IAPIGatewayProxyEvent<null, { namespace: string }>) => {
    const namespace = event.pathParameters.namespace;
    const key = 'visits';
    await this.countApiService.incrementVisits(namespace, key);

    return this.response.success.ok({
      message: "Increment visit successfully!",
      visits: 1
    });
  }

  get = async (event: IAPIGatewayProxyEvent<null, { namespace: string }>) => {
    const namespace = event.pathParameters.namespace;
    const key = 'visits';
    await this.countApiService.get(namespace, key);

    return this.response.success.ok({
      message: "Get visit successfully!",
      visits: 1
    });
  }
}
