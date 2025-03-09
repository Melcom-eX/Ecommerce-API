import Joi from "joi";

export const reviewSchema = Joi.object({
  productId: Joi.string().required(),
  rating: Joi.number().min(1).max(5).required(),
  comment: Joi.string().required(),
});

// Define Joi schema for productId validation
export const productIdSchema = Joi.object({
  productId: Joi.string().uuid().required().messages({
    "string.guid": "Invalid Product ID format",
    "any.required": "Product ID is required",
  }),
});
