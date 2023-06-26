import middy from '@middy/core';
import httpEventNormalizer from '@middy/http-event-normalizer';
import httpJsonBodyParser from '@middy/http-json-body-parser';

import { AuthController } from './controllers/AuthController';
import { UserController } from './controllers/UserController';
import { VisitController } from './controllers/VisitController';
import { authorizer } from './middlewares/authorizer';
import { databaseConnection } from './middlewares/databaseConnection';
import { httpErrorHandler } from './middlewares/httpErrorHandler';
import { validator } from './middlewares/validator';
import { createEventSchema as createUserEventSchema } from './validators/User';

const authController = AuthController.getInstance();
const userController = UserController.getInstance();
const visitController = VisitController.getInstance();

export const authentication = middy(authController.authentication)
  .use(httpEventNormalizer())
  .use(httpJsonBodyParser())
  .use(databaseConnection())
  .use(httpErrorHandler());

export const incrementVisits = middy(visitController.increment)
  .use(httpEventNormalizer())
  .use(httpErrorHandler());

export const getVisits = middy(visitController.get)
  .use(httpEventNormalizer())
  .use(authorizer())
  .use(httpErrorHandler());

export const createUser = middy(userController.create)
  .use(httpEventNormalizer())
  .use(httpJsonBodyParser())
  .use(validator(createUserEventSchema))
  .use(databaseConnection())
  .use(httpErrorHandler());

export const showUser = middy(userController.show)
  .use(httpEventNormalizer())
  .use(authorizer())
  .use(httpJsonBodyParser())
  .use(databaseConnection())
  .use(httpErrorHandler());
