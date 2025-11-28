import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';
import Session from '../models/session.js';

export const authMiddleware = async (req, res, next) => {
  try {
    const { accessToken, sessionId } = req.cookies;

    if (!accessToken || !sessionId) {
      throw createHttpError(401, 'Not authorized');
    }

    let payload;
    try {
      payload = jwt.verify(accessToken, process.env.JWT_SECRET);
    } catch {
      throw createHttpError(401, 'Not authorized');
    }

    const session = await Session.findOne({ _id: sessionId, userId: payload.sub });
    if (!session) {
      throw createHttpError(401, 'Not authorized');
    }

    req.user = { id: payload.sub };

    next();
  } catch (err) {
    next(err);
  }
};
