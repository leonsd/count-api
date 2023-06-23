import axios, { AxiosInstance } from 'axios';

export class HttpService {
  protected httpClient: AxiosInstance;

  constructor(baseURL: string) {
    this.httpClient = axios.create({ baseURL });
  }
}
