import middy from '@middy/core';
import httpEventNormalizer from '@middy/http-event-normalizer';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import httpErrorHandlerMiddleware from '@middy/http-error-handler';

import { VisitController } from './controllers/VisitController';
import { UserController } from './controllers/UserController';
import { validator } from './middlewares/validator';
import { databaseConnection } from './middlewares/databaseConnection';
import { createEventSchema as createUserEventSchema } from './validators/User';

const visitController = VisitController.getInstance();
const userController = UserController.getInstance();

export const incrementVisits = middy(visitController.increment)
  .use(httpEventNormalizer())
  .use(httpErrorHandlerMiddleware());

export const getVisits = middy(visitController.get)
  .use(httpEventNormalizer())
  .use(httpErrorHandlerMiddleware());

export const createUser = middy(userController.create)
  .use(httpEventNormalizer())
  .use(httpJsonBodyParser())
  .use(validator(createUserEventSchema))
  .use(databaseConnection())
  .use(httpErrorHandlerMiddleware());

export const showUser = middy(userController.show)
  .use(httpEventNormalizer())
  .use(httpJsonBodyParser())
  .use(databaseConnection())
  .use(httpErrorHandlerMiddleware());
