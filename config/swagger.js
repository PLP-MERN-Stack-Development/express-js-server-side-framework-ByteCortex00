// config/swagger.js
import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Products API',
      version: '1.0.0',
      description: 'Express.js REST API for managing products with authentication and CRUD operations',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local server',
      },
    ],
    components: {
      securitySchemes: {
        ApiKeyAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'x-api-key',
          description: 'Enter your API key (same value as in your .env file)',
        },
      },
      schemas: {
        Product: {
          type: 'object',
          required: ['name', 'description', 'price', 'category'],
          properties: {
            _id: {
              type: 'string',
              description: 'Auto-generated product ID',
            },
            name: {
              type: 'string',
              description: 'Name of the product',
            },
            description: {
              type: 'string',
              description: 'Detailed information about the product',
            },
            price: {
              type: 'number',
              description: 'Price of the product in USD',
            },
            category: {
              type: 'string',
              description: 'Product category (e.g., electronics, kitchen)',
            },
            inStock: {
              type: 'boolean',
              description: 'Availability status',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
          },
          example: {
            name: 'Wireless Mouse',
            description: 'Ergonomic Bluetooth mouse with long battery life',
            price: 35,
            category: 'electronics',
            inStock: true,
          },
        },
      },
    },
    security: [
      {
        ApiKeyAuth: [],
      },
    ],
    paths: {
      '/api/products': {
        get: {
          summary: 'Get all products',
          description: 'Retrieve all products with optional filtering, search, pagination, and sorting.',
          parameters: [
            {
              in: 'query',
              name: 'category',
              schema: { type: 'string' },
              description: 'Filter products by category',
            },
            {
              in: 'query',
              name: 'keyword',
              schema: { type: 'string' },
              description: 'Search products by name or description',
            },
            {
              in: 'query',
              name: 'page',
              schema: { type: 'integer' },
              description: 'Page number for pagination',
            },
            {
              in: 'query',
              name: 'limit',
              schema: { type: 'integer' },
              description: 'Number of results per page',
            },
            {
              in: 'query',
              name: 'sort',
              schema: { type: 'string' },
              description: 'Sort results by field (prefix with "-" for descending)',
            },
          ],
          responses: {
            200: {
              description: 'List of products retrieved successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean' },
                      count: { type: 'integer' },
                      total: { type: 'integer' },
                      currentPage: { type: 'integer' },
                      totalPages: { type: 'integer' },
                      products: {
                        type: 'array',
                        items: { $ref: '#/components/schemas/Product' },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        post: {
          summary: 'Create a new product',
          description: 'Add a new product to the database.',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Product' },
              },
            },
          },
          responses: {
            201: { description: 'Product created successfully' },
            400: { description: 'Bad request (validation error)' },
          },
        },
      },
      '/api/products/{id}': {
        get: {
          summary: 'Get a product by ID',
          description: 'Retrieve a single product by its unique MongoDB ID.',
          parameters: [
            {
              in: 'path',
              name: 'id',
              required: true,
              schema: { type: 'string' },
              description: 'The product ID',
            },
          ],
          responses: {
            200: {
              description: 'Product found successfully',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Product' },
                },
              },
            },
            404: { description: 'Product not found' },
          },
        },
        put: {
          summary: 'Update a product',
          description: 'Modify an existing product by its ID.',
          parameters: [
            {
              in: 'path',
              name: 'id',
              required: true,
              schema: { type: 'string' },
              description: 'Product ID',
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Product' },
              },
            },
          },
          responses: {
            200: { description: 'Product updated successfully' },
            404: { description: 'Product not found' },
            400: { description: 'Validation error' },
          },
        },
        delete: {
          summary: 'Delete a product',
          description: 'Remove a product from the database by ID.',
          parameters: [
            {
              in: 'path',
              name: 'id',
              required: true,
              schema: { type: 'string' },
              description: 'Product ID',
            },
          ],
          responses: {
            200: { description: 'Product deleted successfully' },
            404: { description: 'Product not found' },
          },
        },
      },
    },
  },
  apis: [], // No need to scan files since we defined paths directly
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);