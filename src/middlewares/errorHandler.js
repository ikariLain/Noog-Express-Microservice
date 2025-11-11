
import { response } from "express";

//Add More error handelingnp if needed
export class AppError extends Error {
  constructor(message, statusCode, details = null ) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export function errorHandler(err, req, res, next) {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';
  let details = err.details || undefined;


  console.error('Error:', {
    message: err.message,
    statusCode,
    path: req.path,
    stack: err.stack,
    timestamp: new Date().toISOString()
  });
  
  if (err.code && err.code.startsWith('stream-') ) {
    statusCode = err.statusCode || 400;
    message = `Stream IO error: ${err.message}`;
  }

  if (details) {
    response.details = details;
  }
}

export function notFound(req, res, next) {
  const error = new AppError(`Route Not Found - ${req.originalUrl} ${req.method}`, 404);
  next(error);
}

export function validationError(message, details) {
  return new AppError(message, 400, details);
}

export function unauthorizedError(message = 'Unauthorized access') {
  return new AppError(message, 401);
}

export function forbiddenError(message = 'Forbidden access') {
  return new AppError(message, 403);
}

export function notFoundError(message = 'Resource not found') {
  return new AppError(`${message}`, 404);
}