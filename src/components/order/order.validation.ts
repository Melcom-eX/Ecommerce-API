import Joi from "joi";

export const createOrderSchema = Joi.object({
  userId: Joi.string().uuid().required().messages({
    "string.guid": "User ID must be a valid UUID",
    "any.required": "User ID is required",
  }),

  cartId: Joi.string().uuid().required().messages({
    "string.guid": "User ID must be a valid UUID",
    "any.required": "User ID is required",
  }),
  shippingAddress: Joi.string().trim().min(5).required().messages({
    "string.base": "Shipping address must be a string",
    "string.min": "Shipping address must be at least 5 characters",
    "any.required": "Shipping address is required",
  }),

  totalAmount: Joi.number().precision(2).positive().required().messages({
    "number.base": "Total amount must be a number",
    "number.positive": "Total amount must be a positive number",
    "any.required": "Total amount is required",
  }),
});

export const orderIdSchema = Joi.object({
  orderId: Joi.string().uuid().required().messages({
    "string.guid": "Invalid Product ID format",
    "any.required": "Product ID is required",
  }),
});

export const updateOrderSchema = Joi.object({
  status: Joi.string()
    .valid("PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED")
    .required()
    .messages({
      "string.base": "Status must be a string",
      "any.only":
        "Status must be one of 'PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'",
      "any.required": "Status is required",
    }),
});
