import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import User from '../models/user.js';
import { createSession, setSessionCookies } from '../services/auth.js';

export const registerUser = async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw createHttpError(400, 'Email in use');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({ email, password: hashedPassword });

  const session = await createSession(user._id);
  setSessionCookies(res, session);

  res.status(201).json(user);
};

export const logoutUser = async (req, res) => {
  const { sessionId } = req.cookies;

  if (sessionId) {
    await sessionId.deleteOne({ _id: sessionId });
  }

  res.clearCookie('sessionId');
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');

  res.status(204).send();
};
