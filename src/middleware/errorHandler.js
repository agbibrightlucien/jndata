import { isCelebrateError } from 'celebrate';

const errorHandler = (err, req, res, next) => {
  if (isCelebrateError(err)) {
    return res.status(400).json({
      error: 'Validation error',
      details: err.details
    });
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  if (process.env.NODE_ENV === 'development') {
    console.error(err.stack);
  }

  res.status(statusCode).json({
    error: message
  });
};

export default errorHandler;