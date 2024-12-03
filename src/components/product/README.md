## Product Endpoints

### Get All Products

- **URL**: `/products`
- **Method**: `GET`
- **Description**: Retrieve all products or filter by category
- **Query Parameters**:
  - `categoryId` (string, optional): Filter products by category ID
- **Success Response**:
  ```json
  {
    "status": "success",
    "statusCode": 200,
    "message": "Products retrieved successfully",
    "data": [
      {
        "id": "product_id",
        "name": "Product Name",
        "description": "Product Description",
        "price": 100.0,
        "stock": 10,
        "images": ["image_url_1", "image_url_2"],
        "categoryId": "category_id",
        "sellerId": "seller_id",
        "createdAt": "2022-01-01T00:00:00.000Z",
        "updatedAt": "2022-01-01T00:00:00.000Z"
      }
    ]
  }
  ```

### Get Product by ID

- **URL**: `/products/:id`
- **Method**: `GET`
- **Description**: Retrieve a specific product by ID
- **Required URL Parameters**:
  - `id` (string): Product's ID
- **Success Response**:
  ```json
  {
    "status": "success",
    "statusCode": 200,
    "message": "Product retrieved successfully",
    "data": {
      "id": "product_id",
      "name": "Product Name",
      "description": "Product Description",
      "price": 100.0,
      "stock": 10,
      "images": ["image_url_1", "image_url_2"],
      "categoryId": "category_id",
      "sellerId": "seller_id",
      "createdAt": "2022-01-01T00:00:00.000Z",
      "updatedAt": "2022-01-01T00:00:00.000Z"
    }
  }
  ```

### Create Product

- **URL**: `/products`
- **Method**: `POST`
- **Description**: Create a new product
- **Required Body Parameters**:
  - `name` (string): Product name
  - `description` (string): Product description
  - `price` (number): Product price
  - `stock` (number): Product stock
  - `images` (array of strings): Product images URLs
  - `categoryId` (string): Category ID
  - `sellerId` (string): Seller ID
- **Validation**:
  - Name is required
  - Description is required
  - Price must be a positive number
  - Stock must be a non-negative integer
  - Images must be an array of valid URLs
  - Category ID must be a valid UUID
  - Seller ID must be a valid UUID
- **Success Response**:
  ```json
  {
    "status": "success",
    "statusCode": 201,
    "message": "Product created successfully",
    "data": {
      "id": "product_id",
      "name": "Product Name",
      "description": "Product Description",
      "price": 100.0,
      "stock": 10,
      "images": ["image_url_1", "image_url_2"],
      "categoryId": "category_id",
      "sellerId": "seller_id",
      "createdAt": "2022-01-01T00:00:00.000Z",
      "updatedAt": "2022-01-01T00:00:00.000Z"
    }
  }
  ```

### Update Product

- **URL**: `/products/:id`
- **Method**: `PUT`
- **Description**: Update a product's information
- **Required URL Parameters**:
  - `id` (string): Product's ID
- **Required Body Parameters** (optional):
  - `name` (string): Product name
  - `description` (string): Product description
  - `price` (number): Product price
  - `stock` (number): Product stock
  - `images` (array of strings): Product images URLs
  - `categoryId` (string): Category ID
  - `sellerId` (string): Seller ID
- **Validation**:

  - Name must be a string (if provided)
  - Description must be a string (if provided)
  - Price must be a positive number (if provided)

  ### Upload Product Images

  - **URL**: `/products/:id/image`
  - **Method**: `POST`
  - **Description**: Upload images for a specific product
  - **Required URL Parameters**:
    - `id` (string): Product's ID
  - **Required Body Parameters**:
    - `images` (array of files): Array of image files to be uploaded
  - **Validation**:
    - `id` must be a valid UUID
    - `images` must be an array of valid image files
  - **Success Response**:
    ```json
    {
      "status": "success",
      "statusCode": 200,
      "message": "Product images uploaded and saved successfully",
      "data": {
        "urls": ["image_url_1", "image_url_2"]
      }
    }
    ```
  - **Error Responses**:
    - **400 Bad Request**:
      ```json
      {
        "status": "error",
        "message": "No files uploaded"
      }
      ```
    - **500 Internal Server Error**:
      ```json
      {
        "status": "error",
        "message": "Internal server error"
      }
      ```
