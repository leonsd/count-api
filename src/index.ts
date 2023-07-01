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
import { authEventSchema } from './validators/Auth';
import { createEventSchema as createUserEventSchema } from './validators/User';
import {
  incrementEventSchema as incrementVisitEventSchema,
  getEventSchema as getVisitEventSchema,
} from './validators/Visit';
import { sendConfirmationEmail } from './handlers/sendConfirmationEmail';

const authController = AuthController.getInstance();
const userController = UserController.getInstance();
const visitController = VisitController.getInstance();

// Http
export const authentication = middy(authController.authentication)
  .use(httpEventNormalizer())
  .use(httpJsonBodyParser())
  .use(validator(authEventSchema))
  .use(databaseConnection())
  .use(httpErrorHandler());

export const incrementVisits = middy(visitController.increment)
  .use(httpEventNormalizer())
  .use(authorizer())
  .use(validator(incrementVisitEventSchema))
  .use(httpErrorHandler());

export const getVisits = middy(visitController.get)
  .use(httpEventNormalizer())
  .use(authorizer())
  .use(validator(getVisitEventSchema))
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

// Workers
export const sendConfirmationEmailWorker = middy(sendConfirmationEmail);
