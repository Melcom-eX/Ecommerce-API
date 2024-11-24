import Joi from "joi";

// Register validator schema
export const register = Joi.object({
  fullName: Joi.string().required().messages({
    "string.base": "Full Name must be a string",
    "string.empty": "Full Name is required",
    "any.required": "Full Name is a required field",
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
  dateOfBirth: Joi.date().required().messages({
    "date.base": "Date of Birth must be a valid date",
    "any.required": "Date of Birth is a required field",
  }),
  phoneNumber: Joi.string().required().messages({
    "string.base": "Phone Number must be a string",
    "string.empty": "Phone Number is required",
    "any.required": "Phone Number is a required field",
  }),
  major: Joi.string().optional().messages({
    "string.base": "Major must be a string",
  }),
  role: Joi.string().optional().messages({
    "string.base": "Role must be a string",
  }),
});

// Login validator schema
export const login = Joi.object({
  email: Joi.string().email().required().messages({
    "string.base": "Email must be a string",
    "string.empty": "Email is required",
    "any.required": "Email is a required field",
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
