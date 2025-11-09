// errorHandler.js

import { HttpError } from 'http-errors';

export function errorHandler(err, req, res, next) {
  console.error(err);

  if (err instanceof HttpError) {
    return res.status(err.status).json({
      message: err.message || err.name,
    });
  }

  const message =
    process.env.NODE_ENV === 'production'
      ? 'Server error'
      : err.message || 'Unexpected error';

  res.status(500).json({ message });
}

export default errorHandler;
