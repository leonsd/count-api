import { RedisCache } from '../../src/services/RedisCache';
import { CacheService } from '../../src/services/CacheService';
import { VisitService } from '../../src/services/VisitService';

jest.mock('../../src/services/RedisCache');
const RedisCacheMock = RedisCache as jest.MockedClass<typeof RedisCache>;

describe('VisitService', () => {
  const makeSut = () => {
    const redisCache = new RedisCacheMock();
    const cacheService = new CacheService(redisCache);
    const sut = new VisitService(cacheService);
    const domain = 'test.ton.com.br';
    redisCache.connect = jest.fn();
    redisCache.close = jest.fn();
    redisCache.get = jest.fn();
    redisCache.set = jest.fn();
    redisCache.incrementBy = jest.fn();

    return { sut, client: redisCache, cacheService, domain };
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('expect "getInstance" returns instance of VisitService', () => {
    const instance = VisitService.getInstance();

    expect(instance).toBeInstanceOf(VisitService);
  });

  describe('increment', () => {
    test('expect "increment" with success calls client.connect and client.close', async () => {
      const { sut, client, domain } = makeSut();
      await sut.increment(domain);

      expect(client.connect).toHaveBeenCalledTimes(1);
      expect(client.close).toHaveBeenCalledTimes(1);
    });

    test('expect "increment" with error calls client.connect and client.close', async () => {
      expect.assertions(2);
      const { sut, client, domain } = makeSut();

      try {
        client.set = jest.fn().mockImplementationOnce(() => {
          throw new Error('any_error');
        });
        await sut.increment(domain);
      } catch (error) {
        expect(client.connect).toHaveBeenCalledTimes(1);
        expect(client.close).toHaveBeenCalledTimes(1);
      }
    });

    test('expect "increment" calls client.set with correct params if is first visit', async () => {
      const { sut, client, domain } = makeSut();
      const initialValue = '0';
      await sut.increment(domain);

      expect(client.set).toHaveBeenCalledTimes(1);
      expect(client.set).toHaveBeenCalledWith(domain, initialValue);
    });

    test('expect "increment" not calls client.set if is not first visit', async () => {
      const { sut, client, domain } = makeSut();
      const cachedVisits = '1';
      client.get = jest.fn().mockImplementationOnce(() => {
        return cachedVisits;
      });
      await sut.increment(domain);

      expect(client.set).not.toHaveBeenCalled();
    });

    test('expect "increment" calls client.incrementBy with correct params and return correct number of visits', async () => {
      const { sut, client, domain } = makeSut();
      const cachedVisits = '1';
      const visitsAfterIncrement = '2';
      client.get = jest.fn().mockImplementationOnce(() => {
        return cachedVisits;
      });
      client.incrementBy = jest.fn().mockImplementationOnce(() => {
        return visitsAfterIncrement;
      });
      const totalVisits = await sut.increment(domain);

      expect(client.incrementBy).toHaveBeenCalledTimes(1);
      expect(client.incrementBy).toHaveBeenCalledWith(domain);
      expect(totalVisits).toBe(visitsAfterIncrement);
    });
  });

  describe('get', () => {
    test('expect "get" with success calls client.connect and client.close', async () => {
      const { sut, client, domain } = makeSut();
      await sut.get(domain);

      expect(client.connect).toHaveBeenCalledTimes(1);
      expect(client.close).toHaveBeenCalledTimes(1);
    });

    test('expect "get" with error calls client.connect and client.close', async () => {
      expect.assertions(2);
      const { sut, client, domain } = makeSut();

      try {
        client.get = jest.fn().mockImplementationOnce(() => {
          throw new Error('any_error');
        });
        await sut.get(domain);
      } catch (error) {
        expect(client.connect).toHaveBeenCalledTimes(1);
        expect(client.close).toHaveBeenCalledTimes(1);
      }
    });

    test('expect "get" return 0 visits if cache has no data', async () => {
      const { sut, domain } = makeSut();
      const totalVisits = await sut.get(domain);

      expect(totalVisits).toBe(0);
    });

    test('expect "get" return correct value of visits', async () => {
      const { sut, client, domain } = makeSut();
      const cachedVisits = '10';
      client.get = jest.fn().mockImplementationOnce(() => {
        return cachedVisits;
      });
      const totalVisits = await sut.get(domain);

      expect(totalVisits).toBe(Number(cachedVisits));
    });
  });
});
