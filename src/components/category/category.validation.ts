import Joi from "joi";

export const createCategoryValidation = Joi.object({
  name: Joi.string().min(2).max(100).trim().required(),
  description: Joi.string().min(10).max(500).trim().required().allow(null, ""),
});
export const updateCategoryValidation = Joi.object({
  name: Joi.string().min(2).max(100).trim().optional(),
  description: Joi.string().min(10).max(500).trim().optional().allow(null, ""),
});
export const deleteCategoryValidation = Joi.object({
  name: Joi.string().min(2).max(100).trim().optional(),
  description: Joi.string().min(10).max(500).trim().optional().allow(null, ""),
});
