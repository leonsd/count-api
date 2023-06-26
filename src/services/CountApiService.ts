import { HttpService } from "./HttpService";

export class CountApiService extends HttpService {
  private constructor(private readonly baseURL: string) {
    super(baseURL);
  }

  static getInstance() {
    const baseURL = process.env.COUNT_API_BASE_URL;
    return new CountApiService(baseURL);
  }

  incrementVisits = async (namespace: string, key: string) => {
    try {
      const uri = `/hit/${namespace}/${key}`;

      return await this.httpClient.post(uri);
    } catch (error) {
      console.error('Error to increment visit', error.message);
      throw error;
    }
  }

  get = async (namespace: string, key: string) => {
    try {
      const uri = `/get/${namespace}/${key}`;

      return await this.httpClient.get(uri);
    } catch (error) {
      console.error('Error to get visit count', error.message);
      throw error;
    }
  }
}
