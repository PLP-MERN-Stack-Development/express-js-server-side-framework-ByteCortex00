export const logger = (req, res, next) => {
  const now = new Date().toLocaleString();
  console.log(`[${now}] ${req.method} ${req.originalUrl}`);
  next(); // Pass control to the next middleware or route
};
