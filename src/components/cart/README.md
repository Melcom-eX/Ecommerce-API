# Cart Component

The Cart component is responsible for managing the shopping cart functionality in the application. It includes endpoints for creating, updating, retrieving, and deleting carts and cart items.

## Endpoints

### Get All Carts

- **URL:** `/api/cart`
- **Method:** `GET`
- **Description:** Retrieve all carts.
- **Protected:** Yes
- **Controller Method:** `getAllCarts`

### Get Cart by User ID

- **URL:** `/api/cart/:id`
- **Method:** `GET`
- **Description:** Retrieve a cart by user ID.
- **Protected:** Yes
- **Controller Method:** `getCartByUserId`

### Create Cart

- **URL:** `/api/cart`
- **Method:** `POST`
- **Description:** Create a new cart.
- **Protected:** Yes
- **Validation Schema:** `createCartValidation`
- **Controller Method:** `createCart`

### Add Cart Item

- **URL:** `/api/cart/item`
- **Method:** `POST`
- **Description:** Add an item to the cart.
- **Protected:** Yes
- **Validation Schema:** `addCartItem`
- **Controller Method:** `addCartItem`

- **Input:**

  ```json
  {
    "cartId": "string (UUID)",
    "productId": "string (UUID)",
    "quantity": "number (integer, min: 1)"
  }
  ```

- **Output:**
  ```json
  {
    "status": "success",
    "statusCode": 200,
    "message": "Item added to cart successfully",
    "data": {
      "cartId": "string (UUID)",
      "productId": "string (UUID)",
      "quantity": "number (integer)"
    }
  }
  ```

### Update Cart Items

- **URL:** `/api/cart/:cartId`
- **Method:** `PUT`
- **Description:** Update items in the cart.
- **Protected:** Yes
- **Validation Schema:** `updateCartValidation`
- **Controller Method:** `updateCartItems`

- **Input:**

  ```json
  {
    "items": [
      {
        "productId": "string (UUID)",
        "quantity": "number (integer, min: 1)"
      }
    ]
  }
  ```

- **Output:**
  ```json
  {
    "status": "success",
    "statusCode": 200,
    "message": "Cart items updated successfully",
    "data": {
      "cartId": "string (UUID)",
      "items": [
        {
          "productId": "string (UUID)",
          "quantity": "number (integer)"
        }
      ]
    }
  }
  ```

### Delete Cart

- **URL:** `/api/cart/:cartId`
- **Method:** `DELETE`
- **Description:** Delete a cart.
- **Protected:** Yes
- **Controller Method:** `deleteCart`

- **Output:**
  ```json
  {
    "status": "success",
    "statusCode": 200,
    "message": "Cart deleted successfully"
  }
  ```

### Remove Cart Item

- **URL:** `/api/cart/item`
- **Method:** `DELETE`
- **Description:** Remove an item from the cart.
- **Protected:** Yes
- **Validation Schema:** `removeCartItem`
- **Controller Method:** `removeCartItem`

- **Input:**

  ```json
  {
    "cartId": "string (UUID)",
    "productId": "string (UUID)"
  }
  ```

- **Output:**
  ```json
  {
    "status": "success",
    "statusCode": 200,
    "message": "Item removed from cart successfully",
    "data": {
      "cartId": "string (UUID)",
      "productId": "string (UUID)"
    }
  }
  ```

### Clear Cart

- **URL:** `/api/cart`
- **Method:** `DELETE`
- **Description:** Clear all items in the cart.
- **Protected:** Yes
- **Validation Schema:** `clearCart`
- **Controller Method:** `clearCart`

- **Input:**

  ```json
  {
    "cartId": "string (UUID)"
  }
  ```

- **Output:**
  ```json
  {
    "status": "success",
    "statusCode": 200,
    "message": "Cart cleared successfully",
    "data": {
      "cartId": "string (UUID)"
    }
  }
  ```

## References

- **Routes:** [cart.routes.ts](./cart.routes.ts)
- **Controller:** [cart.controller.ts](./cart.controller.ts)
- **Service:** [cart.service.ts](./cart.service.ts)
- **Repository:** [cart.repository.ts](./cart.repository.ts)
- **Response Types:** [cart.response.ts](./cart.response.ts)
