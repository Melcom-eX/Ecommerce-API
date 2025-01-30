## Admin API Documentation

This document outlines the admin endpoints available in the admin component.

## Endpoints

### **prefix(url)** e.g localhost:4000/admin`{endpoints}`

### Block a User

- **URL**: `block-user`
- **Method**: `POST`
- **Description**: Block a User
- **Request Params**:
- `id`: User ID
- **Success Response**:

```json
    "status": "success",
    "error": false,
    "statusCode": 200,
    "message": "User blocked successfully",
    "data": {
          "id": "user.id",
          "isBlocked": true,
        },
```

### Unblock a User

- **URL**: `unblock-user`
- **Method**: `POST`
- **Description**: Unblock a User
- **Request Params**:
- `id`: User ID
- **Success Response**:

```json
    "status": "success",
    "error": false,
    "statusCode": 200,
    "message": "User unblocked successfully",
    "data": {
          "id": "user.id",
          "isBlocked": false,
        },
```

### Delete a User

- **URL**: `delete-user`
- **Method**: `POST`
- **Description**: delete a User if they break the regulation after they have been blocked
- **Request Params**:
- `id`: User ID
- **Success Response**:

```json
    "status": "success",
    "error": false,
    "statusCode": 200,
    "message": "User deleted successfully",
```

### Approve a Product

- **URL**: `approve-product`
- **Method**: `POST`
- **Description**: approve a product to be on the platform
- **Request Params**:
- `id`: product ID
- **Success Response**:

```json
    "status": "success",
    "error": false,
    "statusCode": 200,
    "message": "Product approved successfully",
    "data":{
        "id":"product_id",
        "isApproved":true
    }
```

### Approve a Seller

- **URL**: `approve-seller`
- **Method**: `POST`
- **Description**: approve a seller to be on the platform
- **Request Params**:
- `id`: user ID
- **Success Response**:

```json
    "status": "success",
    "error": false,
    "statusCode": 200,
    "message": "Seller verified successfully",
    "data":{
        "id":"seller_id",
        "isApproved":true
    }
```

### Approve a Seller

- **URL**: `products`
- **Method**: `GET`
- **Description**: get a list of all unapproved products
- **Success Response**:

```json
    "status": "success",
    "error": false,
    "statusCode": 200,
    "message": "Products retrieved successfully",
    "data":products
```
