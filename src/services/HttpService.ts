import axios, { AxiosInstance } from 'axios';

export class HttpService {
  protected client: AxiosInstance

  constructor(baseURL: string) {
    this.client = axios.create({ baseURL });
  }
}
