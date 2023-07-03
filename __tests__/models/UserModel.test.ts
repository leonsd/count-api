import { compare } from 'bcrypt';
import { User } from '../../src/models/UserModel';

describe('UserModel', () => {
  const makeSut = () => {
    const sut = new User();

    return { sut };
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('expect "setConfirmationCode" set in confirmationCode property a string with length 6', async () => {
    const { sut } = makeSut();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    sut.setConfirmationCode();

    expect(typeof sut.confirmationCode).toBe('string');
    expect(sut.confirmationCode.length).toBe(6);
  });

  test('expect "hashPassword" set in password a hash', async () => {
    const { sut } = makeSut();
    const rawPassword = '123';
    sut.password = rawPassword;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    sut.hashPassword();

    expect(sut.password).not.toBe(rawPassword);
    expect(await compare(rawPassword, sut.password)).toBe(true);
  });

  test('expect "removePasswordField" delete password property', async () => {
    const { sut } = makeSut();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    sut.removePasswordField();

    expect(sut).not.toHaveProperty('password');
  });
});
