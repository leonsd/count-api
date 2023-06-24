import Exception from './Exception';

export default class NotFoundException extends Exception {
  constructor(message: string = 'Resource not found') {
    const notFoundHttpStatusCode = 404;
    super(notFoundHttpStatusCode, message);
  }
}
