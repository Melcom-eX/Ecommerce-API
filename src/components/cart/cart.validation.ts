import * as Joi from "joi";

// Validation schema for creating a cart
export const createCartValidation = Joi.object({
  userId: Joi.string().uuid().required().messages({
    "string.guid": "User ID must be a valid UUID",
    "any.required": "User ID is required",
  }),
  // items: Joi.array()
  //   .items(
  //     Joi.object({
  //       productId: Joi.string().uuid().required().messages({
  //         "string.guid": "Product ID must be a valid UUID",
  //         "any.required": "Product ID is required",
  //       }),
  //       quantity: Joi.number().integer().min(1).required().messages({
  //         "number.base": "Quantity must be a number",
  //         "number.integer": "Quantity must be an integer",
  //         "number.min": "Quantity must be at least 1",
  //         "any.required": "Quantity is required",
  //       }),
  //     })
  //   )
  //   .required()
  //   .messages({
  //     "array.base": "Items must be an array",
  //     "any.required": "Items are required",
  //   }),
});

// Validation schema for updating a cart
export const updateCartItemsValidation = Joi.object({
  items: Joi.array()
    .items(
      Joi.object({
        productId: Joi.string().uuid().required().messages({
          "string.guid": "Product ID must be a valid UUID",
          "any.required": "Product ID is required",
        }),
        quantity: Joi.number().integer().min(1).required().messages({
          "number.base": "Quantity must be a number",
          "number.integer": "Quantity must be an integer",
          "number.min": "Quantity must be at least 1",
          "any.required": "Quantity is required",
        }),
      })
    )
    .optional()
    .messages({
      "array.base": "Items must be an array",
    }),
});
// Validation schema for cartId, productId, quantity
export const addCartItem = Joi.object({
  cartId: Joi.string().uuid().required().messages({
    "string.guid": "Cart ID must be a valid UUID",
    "any.required": "Cart ID is required",
  }),
  productId: Joi.string().uuid().required().messages({
    "string.guid": "Product ID must be a valid UUID",
    "any.required": "Product ID is required",
  }),
  quantity: Joi.number().integer().min(1).required().messages({
    "number.base": "Quantity must be a number",
    "number.integer": "Quantity must be an integer",
    "number.min": "Quantity must be at least 1",
    "any.required": "Quantity is required",
  }),
});
// Validation schema for cartId and productId
export const removeCartItem = Joi.object({
  cartId: Joi.string().uuid().required().messages({
    "string.guid": "Cart ID must be a valid UUID",
    "any.required": "Cart ID is required",
  }),
  productId: Joi.string().uuid().required().messages({
    "string.guid": "Product ID must be a valid UUID",
    "any.required": "Product ID is required",
  }),
});
export const clearCart = Joi.object({
  cartId: Joi.string().uuid().required().messages({
    "string.guid": "Cart ID must be a valid UUID",
    "any.required": "Cart ID is required",
  }),
});

// Validation schema for deleting a cart
export const deleteCartValidation = Joi.object({
  id: Joi.string().uuid().required().messages({
    "string.guid": "Cart ID must be a valid UUID",
    "any.required": "Cart ID is required",
  }),
});
