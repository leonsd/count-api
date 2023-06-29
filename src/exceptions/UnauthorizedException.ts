import { HttpStatus } from '../enums/httpStatus';
import Exception from './Exception';

export default class UnauthorizedException extends Exception {
  constructor(message = 'Invalid email or password') {
    super(HttpStatus.UNAUTHORIZED, message);
  }
}
