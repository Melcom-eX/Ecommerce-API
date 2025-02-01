## Auth API Documentation

This document outlines the authentication endpoints available in the auth component.

## Endpoints

### **prefix(url)** e.g localhost:4000/auth`{endpoints}`

### Register User

- **URL**: `/signup`
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
  }
  ```

### Login

- **URL**: `/login`
- **Method**: `POST`
- **Description**: Authenticate existing user
- **Required Body Parameters**:
  - `username` (string): User's username
  - `password` (string): User's password
- **Success Response**:
  ```json
  {
    "statusCode": 200,
    "message": "Login successful",
    "data": {
      "username": "User Full Name",
      "id": "user_id"
    },
    "token": "jwt_token"
  }
  ```

### Validate OTP

- **URL**: `/validate-otp/:id`
- **Method**: `POST`
- **Description**: Validate OTP for user
- **Required URL Parameters**:
  - `id` (string): User's ID
- **Required Body Parameters**:
  - `OTP` (number): One-time password
- **Success Response**:
  ```json
  {
    "statusCode": 200,
    "message": "OTP Validated successfully",
    "status": "success",
    "error": false
  }
  ```

### Reset Password

- **URL**: `/reset-password/:id`
- **Method**: `POST`
- **Description**: Send OTP to user's email for password reset
- **Required URL Parameters**:
  - `id` (string): User's ID
- **Required Body Parameters**:
  - `email` (string): User's email
- **Success Response**:
  ```json
  {
    "statusCode": 200,
    "message": "OTP sent to User"
  }
  ```

### Confirm Reset Password

- **URL**: `/confirm-reset-password/:id`
- **Method**: `POST`
- **Description**: Confirm OTP and reset user's password
- **Required URL Parameters**:
  - `id` (string): User's ID
- **Required Body Parameters**:
  - `OTP` (number): One-time password
  - `newPassword` (string): New password
- **Success Response**:

  ```json
  {
    "statusCode": 200,
    "message": "Password successfully updated"
  }
  ```

  ### Subscibe for newsletter

- **URL**: `/newsletter`
- **Method**: `POST`
- **Description**: Send an email to users that registred for a news letter and add's there email to a table
- **Required Body Parameters**:
  - `email` (string): Email string
- **Success Response**:
  ```json
  {
    "status": "success",
    "error": false,
    "statusCode": 200,
    "message": "News letter sent"
  }
  ```

## Files

### auth.routes.ts

Defines the routes for authentication-related operations, including signup, login, OTP validation, password reset, and password confirmation.

### auth.controller.ts

Contains the controller methods for handling authentication logic, such as user signup, login, OTP validation, password reset, and password confirmation.

### auth.validation.ts

Defines the validation schemas for the authentication endpoints, ensuring that the required fields are present and correctly formatted.

### user.service.ts

Contains the service methods for user-related operations, such as creating a user, validating OTP, updating password, and more.

### user.repository.ts

Defines the repository methods for interacting with the database, including finding, creating, updating, and deleting users, as well as finding OTPs.

## Summary

This documentation provides an overview of the authentication endpoints and their corresponding files, detailing the required parameters, validation rules, and success responses for each endpoint.
