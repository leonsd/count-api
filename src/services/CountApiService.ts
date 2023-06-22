import { HttpService } from "./HttpService";

export class CountApiService extends HttpService {
  private constructor(public readonly baseURL: string) {
    super(baseURL);
  }

  static getInstance() {
    const baseURL = process.env.COUNT_API_BASE_URL as string;
    return new CountApiService(baseURL);
  }

  incrementVisits = async () => {
    try {
      return await this.client.post('/hit/ton.com.br/visits');
    } catch (error) {
      console.error('Error to increment visit');
      throw error;
    }
  }
}
