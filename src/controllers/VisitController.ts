import { CountApiService } from "../services/CountApiService";

export class VisitController {
  private constructor(private readonly countApiService: CountApiService) { }

  static getInstance() {
    const countApiService = CountApiService.getInstance();
    return new VisitController(countApiService);
  }

  incrementVisits = async () => {
    // const { data } = await this.countApiService.incrementVisits();

    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: "Increment visit successfully!",
          visits: 1
        },
        null,
        2
      ),
    };
  }
}
