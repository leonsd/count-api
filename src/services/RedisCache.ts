import { createClient } from "redis";
import { ICacheClient } from "../interfaces/CacheClient";

export class RedisCache implements ICacheClient {
  private readonly client;

  constructor() {
    const host = process.env.REDIS_HOST;
    const port = process.env.REDIS_PORT;
    const options = {
      url: `redis://${host}:${port}`
    };

    this.client = createClient(options);
  }

  connect = async () => {
    console.info('Opening redis connection...');
    await this.client.connect();
  }

  close = () => {
    console.info('Closing redis connection...');
    return this.client.quit();
  }

  get = (key: string) => {
    return this.client.get(key);
  }

  set = (key: string, value: string) => {
    return this.client.set(key, value);
  }

  incrementBy = (key: string, increment = 1) => {
    return this.client.incrBy(key, increment);
  }
}
