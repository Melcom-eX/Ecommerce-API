# Seller API Documentation

This document outlines the seller management endpoints available in the seller component.

## Endpoints

### **prefix(url)** e.g localhost:4000/create`{endpoints}`

### Create Seller Account

- **URL**: `/create`
- **Method**: `POST`
- **Description**: Register a user as a seller
- **Authorization**: Bearer Token Required
- **Required Body Parameters**:
  - `businessName` (string): Business name (3-100 characters)
  - `businessAddress` (string): Business address
  - `businessPhone` (string): Business phone number
  - `businessEmail` (string): Valid business email address
  - `sellerType` (string): between fastfood or marketplace
- **Optional Body Parameters**:
  - `description` (string): Business description
  - `taxId` (string): Tax identification number
  - `bankAccount` (string): Bank account details
  - `logo` (string): URL/path to business logo
- **Validation**:
  - All required fields must be present
  - Business email must be valid format
  - Business name must be 3-100 characters
- **Success Response**:
  ```json
  {
    "status": true,
    "message": "Seller account created successfully",
    "data": {
      "id": "seller_id",
      "businessName": "Business Name",
      "description": "Business Description",
      "businessAddress": "Business Address",
      "businessPhone": "Business Phone",
      "businessEmail": "business@example.com",
      "logo": "logo_url",
      "rating": 0,
      "totalSales": 0,
      "isVerified": false,
      "createdAt": "2024-01-10T12:00:00Z"
    }
  }
  ```

## Response Types

### SellerResponse Interface

```typescript
export interface SellerResponse {
  id: string;
  businessName: string;
  description: string | null;
  businessAddress: string;
  businessPhone: string;
  businessEmail: string;
  logo?: string | null;
  rating: number;
  totalSales: number;
  isVerified: boolean;
  createdAt: Date;
}
```

This interface defines the shape of the seller data returned by the API:

- `id`: Unique identifier for the seller
- `businessName`: Name of the business
- `description`: Optional business description
- `businessAddress`: Physical address of the business
- `businessPhone`: Contact phone number
- `businessEmail`: Business email address
- `logo`: Optional URL/path to business logo
- `rating`: Seller's rating (default: 0)
- `totalSales`: Total number of sales (default: 0)
- `isVerified`: Verification status
- `createdAt`: Timestamp of account creation

## Files

### seller.routes.ts

Defines the routes for seller-related operations, currently including seller account creation. Uses middleware for authentication and request validation.

### seller.controller.ts

Contains the controller methods for handling seller management logic, such as seller account creation and profile management.

### seller.validation.ts

Defines the validation schemas for the seller endpoints using Joi, ensuring that the required fields are present and correctly formatted.

### seller.service.ts

Contains the service methods for seller-related operations, such as creating a seller profile and managing seller data.

## Success and Error Codes

- **201**: Seller account created successfully
- **400**: Validation error or business logic error
- **401**: User not authenticated
- **500**: Internal server error

## Summary

This documentation provides an overview of the seller management endpoints and their corresponding files, detailing the required parameters, validation rules, and success responses for each endpoint.

## Development

To work with the seller module:

1. Ensure authentication middleware is properly configured
2. Use appropriate validation schemas for request validation
3. Handle responses according to the defined format
4. Test all endpoints with both valid and invalid data

For more detailed technical implementation, refer to the code comments and test files.
