// middleware/errorHandler.js
export const errorHandler = (err, req, res, next) => {
  console.error('🔥 Error:', err.message);

  // If the status code was already set earlier in the pipeline, keep it; otherwise default to 500
  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Server Error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};
