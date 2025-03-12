import Joi from "joi";

// Register validator schema
export const register = Joi.object({
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
});

// Login validator schema
export const login = Joi.object({
  email: Joi.string().email().required().messages({
    "string.base": "Email must be a string",
    "string.empty": "Email is required",
    "any.required": "Email is a required field",
    "string.email": "Email must be a valid email address",
  }),
  password: Joi.string().required().messages({
    "string.base": "Password must be a string",
    "string.empty": "Password is required",
    "any.required": "Password is a required field",
  }),
});

export const newsletter = Joi.object({
  email: Joi.string().email().required().messages({
    "string.base": "Email must be a string",
    "string.empty": "Email is required",
    "any.required": "Email is a required field",
    "string.email": "Email must be a valid email address",
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

export const authIdSchema = Joi.object({
  id: Joi.string().uuid().required().messages({
    "string.guid": "Invalid Order ID format",
    "any.required": "Product ID is required",
  }),
});
