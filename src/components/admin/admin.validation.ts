import Joi from "joi";

export const adminIdSchema = Joi.object({
  id: Joi.string().uuid().required().messages({
    "string.guid": "Invalid Order ID format",
    "any.required": "Product ID is required",
  }),
});
