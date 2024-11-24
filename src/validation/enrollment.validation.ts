import Joi from "joi";

export const deleteEnrollmentValidation = Joi.object({
  id: Joi.string().required().messages({
    "string.base": "ID must be a string",
    "string.empty": "ID is required",
    "any.required": "ID is a required field",
  }),
});

export const getEnrollmentValidation = Joi.object({
  id: Joi.string().required().messages({
    "string.base": "ID must be a string",
    "string.empty": "ID is required",
    "any.required": "ID is a required field",
  }),
});

export const updateEnrollmentValidation = Joi.object({
  status: Joi.string().required().messages({
    "string.base": "status must be a string",
    "string.empty": "status is required",
    "any.required": "status is a required field",
  }),
});

export const createEnrollmentValidation = Joi.object({
  studentId: Joi.string().required().messages({
    "string.base": "ID must be a string",
    "string.empty": "ID is required",
    "any.required": "ID is a required field",
  }),
  courseId: Joi.string().required().messages({
    "string.base": "status must be a string",
    "string.empty": "status is required",
    "any.required": "status is a required field",
  }),
  enrollmentDate: Joi.string().required().messages({
    "string.base": "status must be a string",
    "string.empty": "status is required",
    "any.required": "status is a required field",
  }),
  status: Joi.string().required().messages({
    "string.base": "status must be a string",
    "string.empty": "status is required",
    "any.required": "status is a required field",
  }),
});
