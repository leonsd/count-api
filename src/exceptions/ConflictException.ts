import Exception from './Exception';

export default class ConflictException extends Exception {
  constructor(message: string = 'There was a conflict on your request') {
    const conflictHttpStatusCode = 409;
    super(conflictHttpStatusCode, message);
  }
}
