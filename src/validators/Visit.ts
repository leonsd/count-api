import Joi from 'joi';

const eventPathParameterSchema = Joi.object({
  namespace: Joi.string().required(),
});

export const incrementEventSchema = Joi.object({
  pathParameters: eventPathParameterSchema,
});

export const getEventSchema = Joi.object({
  pathParameters: eventPathParameterSchema,
});
