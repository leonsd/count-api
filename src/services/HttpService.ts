import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';

export class HttpService {
  protected httpClient: AxiosInstance;

  constructor(baseURL: string, options?: CreateAxiosDefaults) {
    const FIVE_SECONDS = 5 * 1000;
    const defaultOptions: CreateAxiosDefaults = {
      ...options,
      timeout: FIVE_SECONDS
    };

    this.httpClient = axios.create({ baseURL, ...defaultOptions });
  }
}
