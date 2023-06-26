import { HttpService } from '../../src/services/HttpService';
import { CountApiService } from '../../src/services/CountApiService';

jest.mock('../../src/services/HttpService');
const HttpServiceMock = HttpService as jest.MockedClass<typeof HttpService>;

describe('CountApiService', () => {
  const makeSut = () => {
    const sut = CountApiService.getInstance();
    const namespace = 'test.ton.com.br';
    const key = 'visits';

    return { sut, namespace, key };
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('expect "getInstance" returns instance of CountApiService', () => {
    const instance = CountApiService.getInstance();

    expect(instance).toBeInstanceOf(CountApiService);
  });

  test('expect "incrementVisits" calls httpService.client.post with correct params', async () => {
    const { sut, namespace, key } = makeSut();
    const [httpService] = HttpServiceMock.mock.instances;
    const uri = `/hit/${namespace}/${key}`;
    httpService.client = {
      post: jest.fn()
    } as any;

    await sut.incrementVisits(namespace, key);

    expect(httpService.client.post).toHaveBeenCalledTimes(1);
    expect(httpService.client.post).toHaveBeenCalledWith(uri);
  });

  test('expect "incrementVisits" throw error', async () => {
    expect.assertions(2);

    try {
      const { sut, namespace, key } = makeSut();
      const [httpService] = HttpServiceMock.mock.instances;
      httpService.client = {
        post: () => {
          throw new Error('forced error')
        }
      } as any;

      await sut.incrementVisits(namespace, key);
    } catch (error) {
      expect(error.message).toBe('forced error');
      expect(error).toBeInstanceOf(Error);
    }
  });

  test('expect "get" calls httpService.client.get with correct params', async () => {
    const { sut, namespace, key } = makeSut();
    const [httpService] = HttpServiceMock.mock.instances;
    const uri = `/get/${namespace}/${key}`;
    httpService.client = {
      get: jest.fn()
    } as any;

    await sut.get(namespace, key);

    expect(httpService.client.get).toHaveBeenCalledTimes(1);
    expect(httpService.client.get).toHaveBeenCalledWith(uri);
  });

  test('expect "get" throw error', async () => {
    expect.assertions(2);

    try {
      const { sut, namespace, key } = makeSut();
      const [httpService] = HttpServiceMock.mock.instances;
      httpService.client = {
        get: () => {
          throw new Error('forced error')
        }
      } as any;

      await sut.get(namespace, key);
    } catch (error) {
      expect(error.message).toBe('forced error');
      expect(error).toBeInstanceOf(Error);
    }
  });
});
