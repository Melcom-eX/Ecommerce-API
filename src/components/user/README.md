## User API Documentation

This document outlines the user-related endpoints available in the user component.

## Endpoints

### Get All Users

- **URL**: `/users`
- **Method**: `GET`
- **Description**: Retrieve all users (Admin only)
- **Success Response**:
  ```json
  {
    "status": "success",
    "statusCode": 200,
    "message": "Users retrieved successfully",
    "data": [
      {
        "id": "user_id",
        "fullName": "User Full Name",
        "username": "username",
        "email": "user@example.com",
        "phone": "1234567890",
        "wallet": "wallet_id",
        "dateOfBirth": "YYYY-MM-DD",
        "profile": "profile_url",
        "address": "user address",
        "role": "user role"
      }
    ]
  }
  ```

### Get User by ID

- **URL**: `/users/:id`
- **Method**: `GET`
- **Description**: Retrieve a specific user by ID
- **Required URL Parameters**:
  - `id` (string): User's ID
- **Success Response**:
  ```json
  {
    "status": "success",
    "statusCode": 200,
    "message": "User retrieved successfully",
    "data": {
      "id": "user_id",
      "fullName": "User Full Name",
      "username": "username",
      "email": "user@example.com",
      "phone": "1234567890",
      "wallet": "wallet_id",
      "dateOfBirth": "YYYY-MM-DD",
      "profile": "profile_url",
      "address": "user address",
      "role": "user role"
    }
  }
  ```

### Update User

- **URL**: `/users/:id`
- **Method**: `PUT`
- **Description**: Update a user's information
- **Required URL Parameters**:
  - `id` (string): User's ID
- **Required Body Parameters**:
  - `fullName` (string): User's full name (optional)
  - `email` (string): User's email (optional)
  - `dateOfBirth` (date): User's date of birth (optional)
  - `phoneNumber` (string): User's phone number (optional)
  - `major` (string): User's major (optional)
  - `role` (string): User's role (optional)
- **Validation**:
  - All required fields must be present
  - Email must be valid format
- **Success Response**:
  ```json
  {
    "status": "success",
    "statusCode": 200,
    "message": "User updated successfully",
    "data": {
      "id": "user_id",
      "fullName": "User Full Name",
      "username": "username",
      "email": "user@example.com",
      "phone": "1234567890",
      "wallet": "wallet_id",
      "dateOfBirth": "YYYY-MM-DD",
      "profile": "profile_url",
      "address": "user address",
      "role": "user role"
    }
  }
  ```

### Delete User

- **URL**: `/users/:id`
- **Method**: `DELETE`
- **Description**: Delete a user by ID (Admin only)
- **Required URL Parameters**:
  - `id` (string): User's ID
- **Success Response**:
  ```json
  {
    "status": "success",
    "statusCode": 200,
    "message": "User deleted successfully"
  }
  ```

### Upload Profile

- **URL**: `/users/profile/:userId`
- **Method**: `POST`
- **Description**: Upload a user's profile image
- **Required URL Parameters**:
  - `userId` (string): User's ID
- **Required Body Parameters**:
  - `profile` (file): User's profile image file
- **Validation**:
  - Profile must be a valid file
- **Success Response**:
  ```json
  {
    "status": "success",
    "statusCode": 200,
    "message": "Profile image uploaded and saved successfully",
    "data": {
      "url": "profile_image_url"
    }
  }
  ```

## Files

### user.routes.ts

Defines the routes for user-related operations, including getting all users, getting a user by ID, updating a user, deleting a user, and uploading a profile image.

### user.controller.ts

Contains the controller methods for handling user logic, such as retrieving all users, retrieving a user by ID, updating a user, deleting a user, and uploading a profile image.

### user.service.ts
