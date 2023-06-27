import { CacheService } from "../services/CacheService";

export class VisitService {
  private constructor(private readonly cacheService: CacheService) { }

  static getInstance() {
    const cacheService = CacheService.getInstance();
    return new VisitService(cacheService);
  }

  increment = async (domain: string) => {
    const client = this.cacheService.getClient();

    try {
      await client.connect();
      const field = 'visits';
      const firstVisit = await this.firstVisit(domain);

      if (firstVisit) {
        const value = '0';
        console.log({ domain, value });
        await client.set(domain, value);
      }

      const response = await client.incrementBy(domain);
      console.info('cache response', response);

      return response;
    } catch (error) {
      console.error('error', error);
      throw error;
    } finally {
      await client.close();
    }
  }

  get = async (domain: string) => {
    const client = this.cacheService.getClient();

    try {
      await client.connect();
      const response = await client.get(domain);

      if (!response) {
        return 0;
      }

      return Number(response);
    } catch (error) {
      console.error('error', error);
      throw error;
    } finally {
      await client.close();
    }
  }

  private firstVisit = async (domain: string) => {
    const client = this.cacheService.getClient();
    const response = await client.get(domain);

    if (!response) {
      return true;
    }

    try {
      const visits = Number(response);

      if (visits) {
        return false;
      }

      return true;
    } catch (error) {
      return true;
    }
  }
}
