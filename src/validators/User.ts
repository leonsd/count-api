import Joi from 'joi';

/* Password conditions:
  Min 1 uppercase letter.
  Min 1 lowercase letter.
  Min 1 special character.
  Min 1 number.
  Min 8 characters.
  Max 16 characters.
*/
const passwordPattern = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,16}$');
const passwordError = new Error('Password does not match minimum requirements');

const createEventBodySchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(passwordPattern).required().error(passwordError),
  repeatPassword: Joi.ref('password'),
});

export const createEventSchema = Joi.object({
  body: createEventBodySchema
});
