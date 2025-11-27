import jwt from 'jsonwebtoken';
import createHttpError from 'http-errors';
import fs from 'fs/promises';
import handlebars from 'handlebars';

import User from '../models/user.js';
import { sendEmail } from '../utils/sendMail.js';

export const requestResetEmail = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(200).json({
      message: 'Password reset email sent successfully',
    });
  }

  const token = jwt.sign(
    {
      sub: user._id.toString(),
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }
  );

  const resetLink = `${process.env.FRONTEND_DOMAIN}/reset-password?token=${token}`;

  const templatePath = 'src/templates/reset-password-email.html';
  const templateSource = await fs.readFile(templatePath, 'utf8');
  const template = handlebars.compile(templateSource);

  const html = template({
    name: user.name || 'User',
    resetLink,
  });

  try {
    await sendEmail({
      to: user.email,
      subject: 'Reset your password',
      html,
    });

    return res.status(200).json({
      message: 'Password reset email sent successfully',
    });
  } catch (error) {
    throw createHttpError(
      500,
      'Failed to send the email, please try again later.'
    );
  }
};
