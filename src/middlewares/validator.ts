import middy from '@middy/core';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { Schema } from 'joi';
import { response } from '../utils/responses';

export default (validationSchema: Schema) => {
  const before: middy.MiddlewareFn<APIGatewayProxyEvent, APIGatewayProxyResult> = async (
    request
  ) => {
    try {
      const { body } = await validationSchema.validateAsync(request.event, { abortEarly: false, stripUnknown: true });
      request.event = Object.assign(request.event, { body });
    } catch (error) {
      request.response = response.error.badRequest({
        message: error.message
      });
    }
  }

  return { before };
};
