# Product API

A comprehensive RESTful API for managing products, built with Express.js, MongoDB, and Swagger documentation.

## Features

- **CRUD Operations**: Create, read, update, and delete products
- **Advanced Querying**: Search, filter, sort, and paginate product data
- **Authentication**: API key-based authentication
- **Validation**: Request validation middleware
- **Error Handling**: Centralized error handling
- **Logging**: Request logging middleware
- **API Documentation**: Interactive Swagger UI documentation

## Tech Stack

- **Runtime**: Node.js with ES6 modules
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Documentation**: Swagger/OpenAPI 3.0
- **Environment**: dotenv for configuration

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local instance or MongoDB Atlas)
- npm or yarn package manager

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   
   Create a `.env` file in the root directory:
   ```env
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/productsdb
   API_KEY=your-secret-api-key-here
   NODE_ENV=development
   ```

4. **Start the server**
   ```bash
   npm start
   ```

   For development with auto-restart:
   ```bash
   npm run dev
   ```

## Project Structure

```
├── config/
│   ├── db.js              # MongoDB connection
│   └── swagger.js         # Swagger configuration
├── middleware/
│   ├── auth.js            # API key authentication
│   ├── errorHandler.js    # Global error handler
│   ├── logger.js          # Request logger
│   └── productValidator.js # Product validation
├── models/
│   └── productModel.js    # Product schema
├── routes/
│   └── productRoutes.js   # Product routes
├── server.js              # Main application file
├── .env                   # Environment variables
└── package.json
```

## API Endpoints

### Base URL
```
http://localhost:3000
```

### Authentication
All endpoints require an API key to be sent in the request headers:
```
x-api-key: your-secret-api-key-here
```

### Endpoints Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products with optional filters |
| GET | `/api/products/:id` | Get a specific product by ID |
| POST | `/api/products` | Create a new product |
| PUT | `/api/products/:id` | Update a product |
| DELETE | `/api/products/:id` | Delete a product |

## Detailed API Usage

### 1. Get All Products

**Endpoint**: `GET /api/products`

**Query Parameters**:
- `category` (string): Filter by product category
- `keyword` (string): Search in product name or description
- `page` (integer): Page number for pagination (default: 1)
- `limit` (integer): Results per page (default: 5)
- `sort` (string): Sort by field (prefix with `-` for descending)

**Example Requests**:
```bash
# Get all products
curl -H "x-api-key: your-api-key" http://localhost:3000/api/products

# Filter by category
curl -H "x-api-key: your-api-key" http://localhost:3000/api/products?category=electronics

# Search products
curl -H "x-api-key: your-api-key" http://localhost:3000/api/products?keyword=mouse

# Pagination
curl -H "x-api-key: your-api-key" http://localhost:3000/api/products?page=2&limit=10

# Sort by price (ascending)
curl -H "x-api-key: your-api-key" http://localhost:3000/api/products?sort=price

# Sort by price (descending)
curl -H "x-api-key: your-api-key" http://localhost:3000/api/products?sort=-price

# Combined query
curl -H "x-api-key: your-api-key" http://localhost:3000/api/products?category=electronics&sort=-price&page=1&limit=5
```

**Response Example**:
```json
{
  "success": true,
  "count": 5,
  "total": 15,
  "currentPage": 1,
  "totalPages": 3,
  "products": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Wireless Mouse",
      "description": "Ergonomic Bluetooth mouse with long battery life",
      "price": 35,
      "category": "electronics",
      "inStock": true,
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

### 2. Get Product by ID

**Endpoint**: `GET /api/products/:id`

**Example Request**:
```bash
curl -H "x-api-key: your-api-key" http://localhost:3000/api/products/507f1f77bcf86cd799439011
```

**Response Example**:
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Wireless Mouse",
  "description": "Ergonomic Bluetooth mouse with long battery life",
  "price": 35,
  "category": "electronics",
  "inStock": true,
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

### 3. Create Product

**Endpoint**: `POST /api/products`

**Required Fields**:
- `name` (string)
- `description` (string)
- `price` (number, must be positive)
- `category` (string)

**Optional Fields**:
- `inStock` (boolean, default: true)

**Example Request**:
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -H "x-api-key: your-api-key" \
  -d '{
    "name": "Wireless Keyboard",
    "description": "Mechanical keyboard with RGB lighting",
    "price": 89.99,
    "category": "electronics",
    "inStock": true
  }'
```

**Response Example** (201 Created):
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "name": "Wireless Keyboard",
  "description": "Mechanical keyboard with RGB lighting",
  "price": 89.99,
  "category": "electronics",
  "inStock": true,
  "createdAt": "2024-01-15T11:00:00.000Z",
  "updatedAt": "2024-01-15T11:00:00.000Z"
}
```

### 4. Update Product

**Endpoint**: `PUT /api/products/:id`

**Example Request**:
```bash
curl -X PUT http://localhost:3000/api/products/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -H "x-api-key: your-api-key" \
  -d '{
    "name": "Wireless Mouse Pro",
    "description": "Premium ergonomic Bluetooth mouse",
    "price": 45,
    "category": "electronics",
    "inStock": true
  }'
```

**Response Example** (200 OK):
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Wireless Mouse Pro",
  "description": "Premium ergonomic Bluetooth mouse",
  "price": 45,
  "category": "electronics",
  "inStock": true,
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T12:00:00.000Z"
}
```

### 5. Delete Product

**Endpoint**: `DELETE /api/products/:id`

**Example Request**:
```bash
curl -X DELETE http://localhost:3000/api/products/507f1f77bcf86cd799439011 \
  -H "x-api-key: your-api-key"
```

**Response Example** (200 OK):
```json
{
  "message": "Product deleted successfully"
}
```

## Error Responses

### 400 Bad Request
```json
{
  "message": "Missing required fields: name, description, price, category"
}
```

### 401 Unauthorized
```json
{
  "message": "Missing API key"
}
```

### 403 Forbidden
```json
{
  "message": "Invalid API key"
}
```

### 404 Not Found
```json
{
  "message": "Product not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Server Error",
  "stack": "Error details (only in development mode)"
}
```

## API Documentation (Swagger)

Access the interactive API documentation at:
```
http://localhost:3000/api-docs
```

The Swagger UI provides:
- Complete API reference
- Interactive request testing
- Schema documentation
- Authentication configuration

To use Swagger UI:
1. Open `http://localhost:3000/api-docs` in your browser
2. Click the "Authorize" button
3. Enter your API key
4. Test endpoints directly from the browser

## Data Model

### Product Schema

```javascript
{
  name: String (required, trimmed),
  description: String (required),
  price: Number (required, minimum: 0),
  category: String (required),
  inStock: Boolean (default: true),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated)
}
```

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/productsdb` |
| `API_KEY` | API authentication key | `your-secret-key` |
| `NODE_ENV` | Environment mode | `development` or `production` |

## Development

### Running Tests
```bash
npm test
```

### Linting
```bash
npm run lint
```

### Database Seeding
To populate the database with sample data, you can use MongoDB Compass or create a seed script.

## Deployment

### Production Checklist
- [ ] Set `NODE_ENV=production` in environment variables
- [ ] Use strong, unique API key
- [ ] Enable MongoDB authentication
- [ ] Use MongoDB Atlas or secure MongoDB instance
- [ ] Set up proper CORS policies
- [ ] Enable HTTPS
- [ ] Configure rate limiting
- [ ] Set up monitoring and logging

### Deployment Platforms
- **Heroku**: Deploy with Git push
- **Vercel**: Serverless deployment
- **DigitalOcean**: VPS deployment
- **AWS EC2**: Full control deployment

## Troubleshooting

### MongoDB Connection Issues
- Verify `MONGO_URI` in `.env` file
- Check MongoDB service is running
- Ensure network connectivity

### Authentication Errors
- Verify API key matches `.env` file
- Check `x-api-key` header is included in requests

### Port Already in Use
- Change `PORT` in `.env` file
- Stop other processes using the port

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

MIT License

## Support

For issues and questions:
- Open an issue on GitHub
- Check the Swagger documentation
- Review the error logs in the console

---

**API Version**: 1.0.0  
**Last Updated**: October 2025