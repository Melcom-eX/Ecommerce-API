# Auth API Documentation

This document outlines the authentication endpoints available in the auth component.

## Endpoints

### Register User

- **URL**: `/auth/register`
- **Method**: `POST`
- **Description**: Register a new user
- **Required Body Parameters**:
  - `fullName` (string): User's full name
  - `username` (string): Unique username
  - `password` (string): Password (minimum 6 characters)
  - `email` (string): Valid email address
  - `phone` (string): Phone number (10-15 digits, can start with +)
  - `dateOfBirth` (date): User's date of birth
  - `address` (string): User's address
- **Optional Body Parameters**:
  - `photo` (string): URL/path to user's photo
  - `role` (string): User's role
- **Validation**:
  - All required fields must be present
  - Email must be valid format
  - Password must be at least 6 characters
  - Phone must match pattern: /^[+]?[0-9]{10,15}$/
- **Success Response**:
  ```json
  {
    "statusCode": 201,
    "message": "User registered successfully",
    "data": {
      "user": {
        // User details excluding password
      }
    }
  }
  ```

### Login

- **URL**: `/auth/login`
- **Method**: `POST`
- **Description**: Authenticate existing user
- **Required Body Parameters**:
  - `email` (string): User's email
  - `password` (string): User's password
- **Success Response**:
  ```json
  {
    "statusCode": 200,
    "message": "Login successful",
    "data": {
      "token": "JWT_TOKEN",
      "user": {
        // User details excluding password
      }
    }
  }
  ```

### Logout

- **URL**: `/auth/logout`
- **Method**: `POST`
- **Description**: Log out currently authenticated user
- **Headers Required**:
  - `Authorization`: Bearer token
- **Success Response**:
  ```json
  {
    "statusCode": 200,
    "message": "Logged out successfully"
  }
  ```

## Error Responses

All endpoints may return the following error responses:
