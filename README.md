### **Backend README**

# Project Overview

This project is a backend application built using TypeScript and Express.js, designed to provide a robust API for managing users, products, and categories. It utilizes Prisma as an ORM for database interactions, ensuring type safety and ease of use.

**Live API URL:**https://ecommerce-api-production-5b59.up.railway.app/

## Key Components

### 1. **Controllers**

Controllers handle incoming requests and return responses. They act as intermediaries between the client and the service layer.

- **auth.controller.ts**: Manages authentication-related operations.
- **user.controller.ts**: Handles user-related requests such as creating, updating, and retrieving user information.

### 2. **Services**

Services contain the business logic of the application. They interact with repositories to perform CRUD operations.

- **user.service.ts**: Contains methods for user management, including creating and retrieving users.

### 3. **Repositories**

Repositories are responsible for direct database interactions. They abstract the data access layer and provide methods to interact with the database.

- **user.repository.ts**: Contains methods for querying user data from the database.

### 4. **Middleware**

Middleware functions are executed during the request-response cycle. They can modify the request or response objects, end the request-response cycle, or call the next middleware function.

- **jwt.ts**: Handles JWT token verification for protected routes.
- **ValidationMiddleware.ts**: Validates incoming request data against defined schemas.

### 5. **Models**

Models define the structure of the data in the application. They represent the database entities.

- **User.ts**: Defines the User model, including fields like username, email, and password.

### 6. **Routes**

Routes define the endpoints of the API and map them to the appropriate controller methods.

- **auth.routes.ts**: Contains routes related to authentication.
- **user.routes.ts**: Contains routes for user management.

### routes for admins

- **category.routes.ts**: Contains routes for category management.
  - `POST /api/v1/categories`: Requires `isAdmin` middleware.
  - `PUT /api/v1/categories/:id`: Requires `isAdmin` middleware.
  - `DELETE /api/v1/categories/:id`: Requires `isAdmin` middleware.
- **admin.routes.ts**: Contains routes for admin operations.
  - `POST /api/v1/admin/block-user/:id`: Requires `isAdmin` middleware.
  - `POST /api/v1/admin/unblock-user/:id`: Requires `isAdmin` middleware.
  - `DELETE /api/v1/admin/delete-user/:id`: Requires `isAdmin` middleware.
  - `POST /api/v1/admin/approve-product/:id`: Requires `isAdmin` middleware.
  - `POST /api/v1/admin/approve-seller/:id`: Requires `isAdmin` middleware.
  - `GET /api/v1/admin/products`: Requires `isAdmin` middleware.
- **transaction.routes.ts**: Contains routes for transaction management.
  - `GET /api/v1/transactions`: Requires `isAdmin` middleware.
- **cart.routes.ts**: Contains routes for cart management.
  - `GET /api/v1/carts`: Requires `isAdmin` middleware.
- **review.routes.ts**: Contains routes for review management.
  - `GET /api/v1/reviews`: Requires `isAdmin` middleware.

### 7. **Error Handling**

The application includes a centralized error handling mechanism to manage and respond to errors consistently.

- **error.ts**: Defines error response structures and common error messages.
- **validation.error.ts**: Handles validation-specific errors.

### 8. **Utilities**

Utility functions provide common functionalities that can be reused across the application.

- **db.ts**: Manages database connections.
- **email.ts**: Contains functions for sending emails.
- **encryption.ts**: Provides encryption and decryption functionalities.

### 9. **Validation**

Validation schemas ensure that incoming data meets the required format and constraints.

- **auth.validation.ts**: Defines validation rules for authentication-related data.

### 10. **Types**

Type definitions enhance type safety across the application.

- **types.d.ts**: Contains custom type definitions used throughout the project.

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository.
2. Install the dependencies using `npm install`.
3. Set up your environment variables in a `.env` file.
4. Run the application using `npm run dev`.

## Conclusion

This project serves as a comprehensive backend solution, providing essential features for user and product management. It is designed to be scalable and maintainable, making it suitable for various applications.

End Generation Here
