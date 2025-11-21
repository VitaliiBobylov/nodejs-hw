// src/validations/authValidation.js

import { Joi, Segments } from 'celebrate';

export const registerUserSchema = {
  [Segments.BODY]: Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .trim()
      .lowercase()
      .required()
      .messages({
        'string.email': 'Email must be a valid email address',
        'any.required': 'Email is required',
      }),

    password: Joi.string().min(8).max(100).required().messages({
      'string.min': 'Password must be at least 8 characters long',
      'any.required': 'Password is required',
    }),

    username: Joi.string().trim().min(2).max(30).optional().messages({
      'string.min': 'Username must be at least 2 characters long',
      'string.max': 'Username cannot exceed 30 characters',
    }),
  }),
};

export const loginUserSchema = {
  [Segments.BODY]: Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .trim()
      .lowercase()
      .required(),
    password: Joi.string().required(),
  }),
};
