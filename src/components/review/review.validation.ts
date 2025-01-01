import Joi from "joi";

export const reviewSchema = Joi.object({
  userId: Joi.string().required(),
  productId: Joi.string().required(),
  rating: Joi.number().min(1).max(5).required(),
  comment: Joi.string().optional(),
});
