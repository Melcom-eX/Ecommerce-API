# User Component Endpoints

This document provides an overview of the endpoints available in the User component. Each endpoint is designed to handle specific user-related operations.

## Endpoints

### 1. Create User

- **URL:** `/api/user/create`
- **Method:** `POST`
- **Description:** Creates a new user in the system.
- **Request Body:**
  ```json
  {
    "username": "string",
    "password": "string",
    "email": "string"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "User created successfully",
    "userId": "string"
  }
  ```

### 2. Get User

- **URL:** `/api/user/{userId}`
- **Method:** `GET`
- **Description:** Retrieves the details of a specific user by their ID.
- **Response:**
  ```json
  {
    "userId": "string",
    "username": "string",
    "email": "string",
    "createdAt": "string"
  }
  ```

### 3. Update User

- **URL:** `/api/user/update/{userId}`
- **Method:** `PUT`
- **Description:** Updates the details of an existing user.
- **Request Body:**
  ```json
  {
    "username": "string",
    "email": "string"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "User updated successfully"
  }
  ```

### 4. Delete User

- **URL:** `/api/user/delete/{userId}`
- **Method:** `DELETE`
- **Description:** Deletes a user from the system.
- **Response:**
  ```json
  {
    "success": true,
    "message": "User deleted successfully"
  }
  ```

### 5. Get Users

- **URL:** `/api/user/users`
- **Method:** `GET`
- **Description:** Retrieves a list of all users in the system.
- **Response:**
  ```json
  {
    "users": [
      {
        "userId": "string",
        "username": "string",
        "email": "string",
        "createdAt": "string"
      },
      ...
    ]
  }
  ```
