import Joi from "joi";

// deleteUserValidation validator schema
export const deleteUserValidation = Joi.object({
  id: Joi.string().required().messages({
    "string.base": "ID must be a string",
    "string.empty": "ID is required",
    "any.required": "ID is a required field",
  }),
});

// getUserValidation validator schema
export const getUserValidation = Joi.object({
  id: Joi.string().required().messages({
    "string.base": "ID must be a string",
    "string.empty": "ID is required",
    "any.required": "ID is a required field",
  }),
});

// updateUserValidation validator schema
export const updateUserValidation = Joi.object({
  id: Joi.string().required().messages({
    "string.base": "ID must be a string",
    "string.empty": "ID is required",
    "any.required": "ID is a required field",
  }),
  fullName: Joi.string().optional().messages({
    "string.base": "Full Name must be a string",
  }),
  email: Joi.string().email().optional().messages({
    "string.base": "Email must be a string",
    "string.email": "Email must be a valid email address",
  }),
  dateOfBirth: Joi.date().optional().messages({
    "date.base": "Date of Birth must be a valid date",
  }),
  phoneNumber: Joi.string().optional().messages({
    "string.base": "Phone Number must be a string",
  }),
  major: Joi.string().optional().messages({
    "string.base": "Major must be a string",
  }),
  role: Joi.string().optional().messages({
    "string.base": "Role must be a string",
  }),
});
