import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';

import User from '../models/user.js';
import Session from '../models/session.js';

import { createSession, setSessionCookies } from '../services/auth.js';

// -----------------------------
// POST /auth/register
// -----------------------------
export const registerUser = async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw createHttpError(400, 'Email in use');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    email,
    password: hashedPassword,
  });

  const session = await createSession(user._id);
  setSessionCookies(res, session);

  res.status(201).json(user);
};

// -----------------------------
// POST /auth/login
// -----------------------------
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw createHttpError(401, 'Invalid credentials');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw createHttpError(401, 'Invalid credentials');
  }

  // Видаляємо попередню сесію (якщо була)
  await Session.deleteMany({ userId: user._id });

  // Створюємо нову сесію
  const session = await createSession(user._id);
  setSessionCookies(res, session);

  res.status(200).json(user);
};

// -----------------------------
// POST /auth/refresh
// -----------------------------
export const refreshUserSession = async (req, res) => {
  const { sessionId, refreshToken } = req.cookies;

  const session = await Session.findOne({
    _id: sessionId,
    refreshToken,
  });

  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  const isExpired = new Date() > new Date(session.refreshTokenValidUntil);
  if (isExpired) {
    throw createHttpError(401, 'Session token expired');
  }

  // Видаляємо стару сесію
  await Session.deleteOne({ _id: session._id });

  // Створюємо нову
  const newSession = await createSession(session.userId);
  setSessionCookies(res, newSession);

  res.status(200).json({ message: 'Session refreshed' });
};

// -----------------------------
// POST /auth/logout
// -----------------------------
export const logoutUser = async (req, res) => {
  const { sessionId } = req.cookies;

  if (sessionId) {
    await Session.deleteOne({ _id: sessionId });
  }

  res.clearCookie('sessionId');
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');

  res.status(204).send();
};




export const requestResetEmail = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw createHttpError(404, 'User with this email does not exist');
  }
	res.status(200).json({
		message: 'Password reset email sent successfully'
	});
};
