export const validateProduct = (req, res, next) => {
  const { name, description, price, category } = req.body;

  if (!name || !description || !price || !category) {
    return res.status(400).json({
      message: 'Missing required fields: name, description, price, category',
    });
  }

  // Optional: Validate that price is a positive number
  if (price <= 0) {
    return res.status(400).json({ message: 'Price must be a positive number' });
  }

  next(); // Data is valid
};
