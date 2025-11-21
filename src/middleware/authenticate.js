// src/middleware/authenticate.js

import createHttpError from 'http-errors';
import Session from '../models/session.js';
import User from '../models/user.js';

export const authenticate = async (req, res, next) => {
  const accessToken = req.cookies?.accessToken;
  if (!accessToken) {
    return next(createHttpError(401));
  }

  const session = await Session.findOne({ accessToken });
  if (!session) {
    return next(createHttpError(401));
  }

  const isAccessTokenExpired = new Date() > session.accessTokenValidUntil;
  if (isAccessTokenExpired) {
    return next(createHttpError(401));
  }

  const user = await User.findById(session.userId);
  if (!user) {
    return next(createHttpError(401));
  }
  req.user = user;
  next();
};
