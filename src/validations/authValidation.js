import { Joi, Segments } from 'celebrate';

export const registerUserSchema = {
  [Segments.BODY]: Joi.object({
    username: Joi.string().trim().optional(),
    email: Joi.string().email().trim().required(),
    password: Joi.string().min(8).required(),
  }),
};
