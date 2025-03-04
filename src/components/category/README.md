## Category API Documentation

This document outlines the category-related endpoints available in the category component.

## Endpoints

### **prefix(url)** e.g localhost:4000/api/v1/categories`{endpoints}`

### Get All Categories

- **URL**: ``
- **Method**: `GET`
- **Description**: Retrieve all categories
- **Success Response**:
  ```json
  {
    "status": "success",
    "statusCode": 200,
    "data": [
      {
        "id": "category_id",
        "name": "Category Name",
        "description": "Category Description"
      }
    ]
  }
  ```

### Get Category by ID

- **URL**: `/:id`
- **Method**: `GET`
- **Description**: Retrieve a specific category by ID
- **Required URL Parameters**:
  - `id` (string): Category's ID
- **Success Response**:
  ```json
  {
    "status": "success",
    "statusCode": 200,
    "data": {
      "id": "category_id",
      "name": "Category Name",
      "description": "Category Description"
    }
  }
  ```

### Create Category

- **URL**: ``
- **Method**: `POST`
- **Description**: Create a new category
- **Required Body Parameters**:
  - `name` (string): Category name
  - `description` (string): Category description
- **Validation**:
  - Name must be a string between 2 and 100 characters
  - Description must be a string between 10 and 500 characters
- **Success Response**:
  ```json
  {
    "status": "success",
    "statusCode": 201,
    "data": {
      "id": "category_id",
      "name": "Category Name",
      "description": "Category Description"
    }
  }
  ```

### Update Category

- **URL**: `/:id`
- **Method**: `PUT`
- **Description**: Update a category's information
- **Required URL Parameters**:
  - `id` (string): Category's ID
- **Required Body Parameters**:
  - `name` (string): Category name (optional)
  - `description` (string): Category description (optional)
- **Validation**:
  - Name must be a string between 2 and 100 characters (if provided)
  - Description must be a string between 10 and 500 characters (if provided)
- **Success Response**:
  ```json
  {
    "status": "success",
    "statusCode": 200,
    "data": {
      "id": "category_id",
      "name": "Category Name",
      "description": "Category Description"
    }
  }
  ```

### Delete Category

- **URL**: `/:id`
- **Method**: `DELETE`
- **Description**: Delete a category by ID
- **Required URL Parameters**:
  - `id` (string): Category's ID
- **Success Response**:
  ```json
  {
    "status": "success",
    "statusCode": 200,
    "message": "Category deleted successfully"
  }
  ```

## Files

### category.routes.ts

Defines the routes for category-related operations, including getting all categories, getting a category by ID, creating a category, updating a category, and deleting a category.

### category.controller.ts

Contains the controller methods for handling category logic, such as retrieving all categories, retrieving a category by ID, creating a category, updating a category, and deleting a category.

### category.service.ts

Contains the service methods for category-related operations, such as getting all categories, getting a category by ID, creating a category, updating a category, and deleting a category.

### category.repository.ts

Defines the repository methods for interacting with the database, including finding, creating, updating, and deleting categories.

### category.validation.ts

Defines the validation schemas for the category endpoints, ensuring that the required fields are present and correctly formatted.
