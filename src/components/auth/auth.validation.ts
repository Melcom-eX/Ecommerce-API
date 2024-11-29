import Joi from "joi";

// Register validator schema
export const register = Joi.object({
  fullName: Joi.string().required().messages({
    "string.base": "Full Name must be a string",
    "string.empty": "Full Name is required",
    "any.required": "Full Name is a required field",
  }),
  username: Joi.string().required().messages({
    "string.base": "User Name must be a string",
    "string.empty": "User Name is required",
    "any.required": "User Name is a required field",
  }),
  password: Joi.string().required().min(6).messages({
    "string.base": "Password must be a string",
    "string.empty": "Password is required",
    "any.required": "Password is a required field",
    "string.min": "Password must be at least 6 characters long", // Example min length validation
  }),
  email: Joi.string().email().required().messages({
    "string.base": "Email must be a string",
    "string.empty": "Email is required",
    "any.required": "Email is a required field",
    "string.email": "Email must be a valid email address",
  }),
  phone: Joi.string()
    .pattern(/^[+]?[0-9]{10,15}$/)
    .required()
    .messages({
      "string.base": "Phone string must be a string",
      "string.empty": "Phone string is required",
      "any.required": "Phone string is a required field",
    }),
  dateOfBirth: Joi.date().required().messages({
    "date.base": "Date of Birth must be a valid date",
    "any.required": "Date of Birth is a required field",
  }),
  photo: Joi.string().optional().messages({
    "string.base": "photo must be a string",
  }),
  address: Joi.string().required().messages({
    "string.base": "address must be a string",
    "string.empty": "address is required",
    "any.required": "address is a required field",
  }),
  role: Joi.string().optional().messages({
    "string.base": "Role must be a string",
  }),
});

// Login validator schema
export const login = Joi.object({
  username: Joi.string().required().messages({
    "string.base": "User Name must be a string",
    "string.empty": "User Name is required",
    "any.required": "User Name is a required field",
  }),
  password: Joi.string().required().messages({
    "string.base": "Password must be a string",
    "string.empty": "Password is required",
    "any.required": "Password is a required field",
  }),
});

// validateOTP validator schema
export const validateOTP = Joi.object({
  OTP: Joi.number().required().messages({
    "number.base": "OTP must be a number",
    "number.empty": "OTP is required",
    "any.required": "OTP is a required field",
  }),
});

// ResetPassword validator schema
export const ResetPassword = Joi.object({
  id: Joi.string().required().messages({
    "string.base": "ID must be a string",
    "string.empty": "ID is required",
    "any.required": "ID is a required field",
  }),
  email: Joi.string().email().required().messages({
    "string.base": "Email must be a string",
    "string.empty": "Email is required",
    "any.required": "Email is a required field",
  }),
});

// confirmResetPassword validator schema
export const confirmResetPassword = Joi.object({
  id: Joi.string().required().messages({
    "string.base": "ID must be a string",
    "string.empty": "ID is required",
    "any.required": "ID is a required field",
  }),
  OTP: Joi.number().required().messages({
    "number.base": "OTP must be a number",
    "number.empty": "OTP is required",
    "any.required": "OTP is a required field",
  }),
  newPassword: Joi.string().required().messages({
    "string.base": "newPassword must be a string",
    "string.empty": "newPassword is required",
    "any.required": "newPassword is a required field",
  }),
});
