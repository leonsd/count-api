import middy from '@middy/core';
import httpEventNormalizer from '@middy/http-event-normalizer';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import httpErrorHandlerMiddleware from '@middy/http-error-handler';

import { AuthController } from './controllers/AuthController';
import { UserController } from './controllers/UserController';
import { VisitController } from './controllers/VisitController';
import { authentication } from './middlewares/authentication';
import { databaseConnection } from './middlewares/databaseConnection';
import { validator } from './middlewares/validator';
import { createEventSchema as createUserEventSchema } from './validators/User';

const authController = AuthController.getInstance();
const userController = UserController.getInstance();
const visitController = VisitController.getInstance();

export const login = middy(authController.login)
  .use(httpEventNormalizer())
  .use(httpJsonBodyParser())
  .use(databaseConnection())
  .use(httpErrorHandlerMiddleware());

export const incrementVisits = middy(visitController.increment)
  .use(httpEventNormalizer())
  .use(httpErrorHandlerMiddleware());

export const getVisits = middy(visitController.get)
  .use(httpEventNormalizer())
  .use(authentication())
  .use(httpErrorHandlerMiddleware());

export const createUser = middy(userController.create)
  .use(httpEventNormalizer())
  .use(httpJsonBodyParser())
  .use(validator(createUserEventSchema))
  .use(databaseConnection())
  .use(httpErrorHandlerMiddleware());

export const showUser = middy(userController.show)
  .use(httpEventNormalizer())
  .use(authentication())
  .use(httpJsonBodyParser())
  .use(databaseConnection())
  .use(httpErrorHandlerMiddleware());
