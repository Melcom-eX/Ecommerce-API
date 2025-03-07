import * as Joi from "joi";

// Validation schema for creating a product
export const createProductValidation = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Product name is required",
  }),
  description: Joi.string().required().messages({
    "string.empty": "Product description is required",
  }),
  price: Joi.number().positive().required().messages({
    "number.base": "Product price must be a number",
    "number.positive": "Product price must be a positive number",
    "any.required": "Product price is required",
  }),
  stock: Joi.number().integer().min(0).required().messages({
    "number.base": "Product stock must be a number",
    "number.integer": "Product stock must be an integer",
    "number.min": "Product stock cannot be negative",
    "any.required": "Product stock is required",
  }),
  images: Joi.array().items(Joi.string().uri()).optional().messages({
    "array.base": "Product images must be an array of URLs",
    "string.uri": "Each image must be a valid URL",
    "any.required": "Product images are required",
  }),
  categoryId: Joi.string().uuid().required().messages({
    "string.guid": "Category ID must be a valid UUID",
    "any.required": "Category ID is required",
  }),
  sellerId: Joi.string().uuid().required().messages({
    "string.guid": "Seller ID must be a valid UUID",
    "any.required": "Seller ID is required",
  }),
});

// Validation schema for updating a product
export const updateProductValidation = Joi.object({
  name: Joi.string().optional(),
  description: Joi.string().optional(),
  price: Joi.number().positive().optional().messages({
    "number.base": "Product price must be a number",
    "number.positive": "Product price must be a positive number",
  }),
  stock: Joi.number().integer().min(0).optional().messages({
    "number.base": "Product stock must be a number",
    "number.integer": "Product stock must be an integer",
    "number.min": "Product stock cannot be negative",
  }),
  images: Joi.array().items(Joi.string().uri()).optional().messages({
    "array.base": "Product images must be an array of URLs",
    "string.uri": "Each image must be a valid URL",
  }),
  categoryId: Joi.string().uuid().optional().messages({
    "string.guid": "Category ID must be a valid UUID",
  }),
});

// Validation schema for deleting a product
export const deleteProductValidation = Joi.object({
  id: Joi.string().uuid().required().messages({
    "string.guid": "Product ID must be a valid UUID",
    "any.required": "Product ID is required",
  }),
});

export const categoryQueryValidation = Joi.object({
  categoryId: Joi.string().required().uuid().messages({
    "string.base": "Category ID must be a string",
    "string.empty": "Category ID is required",
    "string.guid": "Category ID must be a valid UUID",
  }),
});
